const { isPhoneNumber, isPassword } = require(".");
const { AUTH_ERRORS, ERROR_FIELDS, SMS_ERRORS } = require("../config");

const loginValidator = (data) => {
  const { phoneNumber, password } = data;
  if (!isPhoneNumber(phoneNumber)) {
    return {
      validate: false,
      error: AUTH_ERRORS.INVALID_PHONE_NUMBER,
      field: ERROR_FIELDS.PHONE_NUMBER,
    };
  }
  if (!isPassword(password)) {
    return {
      validate: false,
      error: AUTH_ERRORS.INVALID_PASSWORD,
      field: ERROR_FIELDS.PASSWORD,
    };
  }
  return { validate: true };
};

const signupValidator = (data) => {
  const { name, phoneNumber, password } = data;
  if (!name) {
    return {
      validate: false,
      error: AUTH_ERRORS.INVALID_NAME,
      field: ERROR_FIELDS.NAME,
    };
  }
  if (!isPhoneNumber(phoneNumber)) {
    return {
      validate: false,
      error: AUTH_ERRORS.INVALID_PHONE_NUMBER,
      field: ERROR_FIELDS.PHONE_NUMBER,
    };
  }
  if (!isPassword(password)) {
    return {
      validate: false,
      error: AUTH_ERRORS.INVALID_PASSWORD,
      field: ERROR_FIELDS.PASSWORD,
    };
  }
  return { validate: true };
};

const publicSmsValidator = (data) => {
  const { phoneNumber, message } = data;
  if (!isPhoneNumber(phoneNumber)) {
    return {
      validate: false,
      error: SMS_ERRORS.INVALID_PHONE_NUMBER,
      field: ERROR_FIELDS.PHONE_NUMBER,
    };
  }
  if (!message) {
    return {
      validate: false,
      error: SMS_ERRORS.MISSING_MESSAGE,
      field: ERROR_FIELDS.MESSAGE,
    };
  }
  return { validate: true };
};

module.exports = { loginValidator, signupValidator, publicSmsValidator };
