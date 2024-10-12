const { Sequelize, Op } = require("sequelize");
const Sms = require("../models/Sms");
const {
  MAX_SMS_PER_DAY,
  MAX_SMS_PER_MINUTE,
  SMS_STATUSES,
} = require("../config");
const { publicSmsValidator } = require("../utils/validator");
const AppError = require("../utils/appError");
const { redisClient } = require("../utils/db");

const generateRedisKey = (ip, phoneNumber, window) => {
  return `sms_rate_limit:${ip}:${phoneNumber}:${window}`;
};

// Middleware to check rate limit
module.exports = rateLimiter = async (req, res, next) => {
  const { phoneNumber, message } = req.body;
  const isValid = publicSmsValidator({ phoneNumber, message });
  if (!isValid.validate) {
    const err = new AppError(isValid.error, 401, isValid.field);
    return next(err);
  }
  const ip = req.ip;

  // Generate Redis keys for minute and day rate limits
  const minuteKey = generateRedisKey(ip, phoneNumber, "minute");
  const dayKey = generateRedisKey(ip, phoneNumber, "day");

  try {
    // Get the current number of requests in the last minute and day
    const [minuteCount, dayCount] = await Promise.all([
      redisClient.get(minuteKey), // Count for the last minute
      redisClient.get(dayKey), // Count for the last day
    ]);

    // Convert null (if the key doesn't exist yet) to 0
    const currentMinuteCount = minuteCount ? parseInt(minuteCount) : 0;
    const currentDayCount = dayCount ? parseInt(dayCount) : 0;

    // Check if rate limit is exceeded
    if (
      currentMinuteCount >= MAX_SMS_PER_MINUTE ||
      currentDayCount >= MAX_SMS_PER_DAY
    ) {
      const [minuteTTL, dayTTL] = await Promise.all([
        redisClient.ttl(minuteKey), // Time-to-live for the minute rate limit
        redisClient.ttl(dayKey), // Time-to-live for the day rate limit
      ]);

      // Determine which limit was hit and how long the user should wait
      let retryAfter = 0;
      let limitHit = "";

      if (currentMinuteCount >= MAX_SMS_PER_MINUTE) {
        retryAfter = minuteTTL; // How many seconds until they can send another SMS in the current minute window
        limitHit = "minute";
      } else if (currentDayCount >= MAX_SMS_PER_DAY) {
        retryAfter = dayTTL; // How many seconds until they can send another SMS in the current day window
        limitHit = "day";
      }

      res.set("Retry-After", retryAfter);

      Sms.create({
        phone_number: phoneNumber,
        message: message,
        ip_address: ip,
        status: SMS_STATUSES.RATE_LIMITED,
      });
      const errorMessage = `You have reached the ${limitHit} limit for sending SMS. Please try again in ${retryAfter} seconds.`;
      return res
        .status(429)
        .json({ success: false, message: errorMessage, field: "toast" });
    }

    // Increment Redis counters for minute and day
    await Promise.all([
      redisClient.incr(minuteKey), // Increment the minute count
      redisClient.incr(dayKey), // Increment the day count
    ]);

    // Set expiry times (60 seconds for minute limit, 86400 seconds for day limit)
    await Promise.all([
      redisClient.expire(minuteKey, 60),
      redisClient.expire(dayKey, 86400),
    ]);

    // If rate limit is not exceeded, allow the request
    next();
  } catch (error) {
    console.error("Rate limiting error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
