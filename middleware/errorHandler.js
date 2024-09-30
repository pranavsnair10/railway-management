
export const errorHandler = (err, req, res, next) => {
  // Check if headers are already sent, if yes, pass the error to the next middleware
  if (res.headersSent) {
    return next(err);
  }

  console.error(err.stack);

  // Handle validation or custom errors
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  // General error fallback
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
};
