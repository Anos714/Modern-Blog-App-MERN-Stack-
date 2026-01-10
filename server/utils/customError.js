export const customError = (statusCode, res, msg) => {
  return res.status(statusCode).json({
    success: false,
    msg,
  });
};
