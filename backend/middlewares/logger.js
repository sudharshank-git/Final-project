/** Logs one line per request once the response has finished. */
export const requestLogger = (req, res, next) => {
  res.on("finish", () => {
    const path = req.route?.path ? req.baseUrl + req.route.path : req.originalUrl;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${path} ${res.statusCode}`
    );
  });
  next();
};
