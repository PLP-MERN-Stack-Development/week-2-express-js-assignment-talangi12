const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes

    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred.';
    const errorName = err.name || 'InternalServerError';

    res.status(statusCode).json({
        status: 'error',
        name: errorName,
        message: message,
        // In production, you might not want to send the stack trace
        // stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
};

module.exports = errorHandler;
