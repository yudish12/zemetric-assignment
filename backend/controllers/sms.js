const Sms = require("../models/Sms");
const { catchAsync } = require("../utils");
const { Op } = require("sequelize");
const { sequelizeClient } = require("../utils/db");
const { SMS_STATUSES } = require("../config");

const sendSms = catchAsync(async (req, res, next) => {
  const { phoneNumber, message } = req.body;

  const sms = await Sms.create({
    phone_number: phoneNumber,
    message,
    ip_address: req.ip,
    status: SMS_STATUSES.SENT,
  });

  return res.status(200).json({ sms, success: true });
});

const getRateLimitViolations = catchAsync(async (req, res, next) => {
  const { user } = req;

  const rateLimitViolations = await Sms.findAll({
    where: {
      phone_number: user.phone_number,
      status: SMS_STATUSES.RATE_LIMITED,
    },
  });
  return res.status(200).json({ rateLimitViolations, success: true });
});

const getSmsStats = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { phone_number } = user;

  // General stats by status
  const smsStats = await Sms.findAll({
    where: { phone_number },
    attributes: [
      "status",
      [sequelizeClient.fn("COUNT", sequelizeClient.col("status")), "count"],
    ],
    group: ["status"],
  });

  // SMS sent today (within the last 24 hours)
  const smsSentToday = await Sms.findAll({
    where: {
      phone_number,
      createdAt: { [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
    attributes: [
      "status",
      [sequelizeClient.fn("COUNT", sequelizeClient.col("status")), "count"],
    ],
    group: ["status"],
  });

  // SMS sent in the last minute
  const smsSentLastMinute = await Sms.findAll({
    where: {
      phone_number,
      createdAt: { [Op.gte]: new Date(Date.now() - 60 * 1000) },
    },
    attributes: [
      "status",
      [sequelizeClient.fn("COUNT", sequelizeClient.col("status")), "count"],
    ],
    group: ["status"],
  });

  // Total counts for each query
  const totalSmsCount = await Sms.count({
    where: { phone_number },
  });

  const totalSmsSentToday = await Sms.count({
    where: {
      phone_number,
      createdAt: { [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
  });

  const totalSmsSentLastMinute = await Sms.count({
    where: {
      phone_number,
      createdAt: { [Op.gte]: new Date(Date.now() - 60 * 1000) },
    },
  });

  return res.status(200).json({
    success: true,
    smsStats,
    totalSmsCount,
    smsSentToday,
    totalSmsSentToday,
    smsSentLastMinute,
    totalSmsSentLastMinute,
  });
});

const getSmsLogs = catchAsync(async (req, res, next) => {
  const { user } = req;
  const smsLogs = await Sms.findAll({
    where: {
      phone_number: user.phone_number,
    },
    attributes: [
      "message",
      "status",
      "createdAt",
      "ip_address",
      "phone_number",
    ],
    order: [["createdAt", "DESC"]],
  });
  return res.status(200).json({ smsLogs, success: true });
});

module.exports = { sendSms, getSmsStats, getRateLimitViolations, getSmsLogs };
