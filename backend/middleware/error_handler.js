function errorHandler(err, req, res, next) {
  console.error('Error:', err); // Log the error for debugging
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
}

export default errorHandler;
