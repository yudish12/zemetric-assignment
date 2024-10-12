const User = require("../models/User");
const { catchAsync, signToken } = require("../utils");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const { AUTH_ERRORS, ERROR_FIELDS } = require("../config");
const { signupValidator, loginValidator } = require("../utils/validator");

const login = catchAsync(async (req, res, next) => {
  const { phoneNumber, password } = req.body;

  const { validate, error, field } = loginValidator({ phoneNumber, password });

  if (!validate) {
    const err = new AppError(error, 401, field);
    return next(err);
  }

  const user = await User.findOne({ where: { phone_number: phoneNumber } });

  if (!user) {
    const err = new AppError(
      AUTH_ERRORS.USER_NOT_FOUND,
      404,
      ERROR_FIELDS.PHONE_NUMBER
    );
    return next(err);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    const err = new AppError(
      AUTH_ERRORS.INCORRECT_PASSWORD,
      401,
      ERROR_FIELDS.PASSWORD
    );
    return next(err);
  }

  const token = signToken(
    { phoneNumber, name: user.name },
    process.env.JWT_SECRET
  );
  return res.status(200).json({ token, user, success: true });
});

const signup = catchAsync(async (req, res, next) => {
  const { phoneNumber, name, password } = req.body;

  const { validate, error, field } = signupValidator({
    name,
    phoneNumber,
    password,
  });

  if (!validate) {
    const err = new AppError(error, 401, field);
    return next(err);
  }

  const user = await User.findOne({ where: { phone_number: phoneNumber } });
  if (user) {
    const err = new AppError(AUTH_ERRORS.USER_EXISTS, 400, ERROR_FIELDS.TOAST);
    return next(err);
  }

  const user_new = await User.create({
    name: req.body.name,
    phone_number: req.body.phoneNumber,
    password: req.body.password,
  });

  const token = signToken(
    { phoneNumber, name: user_new.name },
    process.env.JWT_SECRET
  );
  return res.status(200).json({ token, user: user_new, success: true });
});

const getUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({ data: user, success: true });
});

module.exports = { login, signup, getUser };
