import AppError from "../utils/appError.js";

const handleJWTError = () =>
  new AppError("Invalid token . Please log in again", 401);

const handleJWTExpireError = () => {
  return new AppError("Token has already expired. Please log in again.", 401);
};

const handleCastleErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  //   const value = err.keyValue.name;
  const value = Object.values(err.keyValue).join(", ");
  const message = `Duplicate field ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDb = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: false,
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //operationals or trusted error:- send error back to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
    //programming or other unkown error
  } else {
    res.status(500).json({
      status: "error",
      success: false,
      message: "Something went very wrong",
    });
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (err.name === "CastError") {
      error = handleCastleErrorDB(error);
    }

    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    if (err.name === "ValidationError") {
      error = handleValidationErrorDb(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = handleJWTError(error);
    }

    if (error.name === "TokenExpiredError") {
      error = handleJWTExpireError(error);
    }
    sendErrorProd(err, res);
  }
};
