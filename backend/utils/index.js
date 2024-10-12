const jwt = require("jsonwebtoken");

const catchAsync = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch((err) => {
      return next(err);
    });
  };
};

const signToken = (obj) => {
  const token = jwt.sign({ obj }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return token;
};

const isPhoneNumber = (phoneNumber) => {
  const re = /^\d{10}$/;
  return re.test(String(phoneNumber));
};

const isPassword = (password) => {
  return password.length >= 8;
};

module.exports = { signToken, catchAsync, isPassword, isPhoneNumber };
