module.exports = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500; //checking weather statuscode is there if not assign 500
  err.status = err.status || "error"; //if status not there just assign error
  err.field = err.field || "toast"; //if field not there just assign toast
  err.message = err.message || "Something went wrong"; //if message not there just assign message

  if (err.code === 11000) {
    const str = JSON.stringify(err.keyValue);
    return res.status(err.statusCode).json({
      status: err.status,
      success: false,
      message: `Duplicated key value pair found ${str}`,
      obj: err.keyValue,
    });
  }

  //returns the error response in json to user
  return res.status(err.statusCode).json({
    status: err.status,
    success: false,
    message: err.message,
    field: err.field,
  });
};
