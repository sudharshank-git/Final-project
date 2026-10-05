const isProduction = process.env.NODE_ENV === "production";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  if (statusCode >= 500) console.error(err);

  // Malformed JSON bodies surface as 400 from express.json()
  const message =
    statusCode >= 500 && isProduction ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    success: false,
    message: message || "Internal Server Error",
  });
};

export default errorHandler;
