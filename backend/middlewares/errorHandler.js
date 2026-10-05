const isProduction = process.env.NODE_ENV === "production";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  const message =
    statusCode >= 500 && isProduction ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    success: false,
    message: message || "Internal Server Error",
  });
};

export default errorHandler;
