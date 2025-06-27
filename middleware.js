const { UnauthorizedError } = require('../utils/errors');

const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    // In a real application, you would compare this to a stored secret API key.
    // For this example, we'll use a simple hardcoded key.
    const EXPECTED_API_KEY = process.env.API_KEY || 'your-secret-api-key';

    if (!apiKey || apiKey !== EXPECTED_API_KEY) {
        return next(new UnauthorizedError('Unauthorized: Invalid or missing API key.'));
    }
    next();
};

module.exports = authenticateApiKey;
