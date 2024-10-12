class AppError extends Error {
  constructor(message, statusCode, field) {
    super(message); //calls constructor of Error class to create error object with message string

    this.statusCode = statusCode;
    this.status = ` ${statusCode}`.startsWith("4") ? "fail" : "error";
    this.field = field;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
