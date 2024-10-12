const { catchAsync } = require("../utils");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("../models/User");
const { AUTH_ERRORS, ERROR_FIELDS } = require("../config");

const authMiddleware = catchAsync(async (req, res, next) => {
  let token;

  // Check if the token is provided and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token, return an error
  if (!token) {
    return next(
      new AppError(AUTH_ERRORS.NOT_LOGGED_IN, 401, ERROR_FIELDS.TOAST)
    );
  }

  // Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // Find the user using the email from the token
  const user = await User.findOne({
    where: { phone_number: decoded.obj.phoneNumber },
  });

  // If no user found, return an error
  if (!user) {
    return next(
      new AppError(AUTH_ERRORS.NOT_LOGGED_IN, 401, ERROR_FIELDS.TOAST)
    );
  }

  // Attach the user to the request object
  req.user = user;

  // Pass control to the next middleware or route handler
  next();
});

module.exports = { authMiddleware };
