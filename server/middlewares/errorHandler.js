export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const msg = err.message || "Internal server error";

  console.error(err);

  return res.status(statusCode).json({
    success: false,
    msg,
  });
};
