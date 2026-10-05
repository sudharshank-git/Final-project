export const requestLogger = (req, res, next) => {
  res.on("finish", () => {
    const path = req.route?.path
      ? req.baseUrl + req.route.path
      : req.originalUrl;
    // Request logging intentionally disabled to keep the runtime quiet.
    void path;
  });
  next();
};
