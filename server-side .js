const express = require('express');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./middleware/logger');
const authenticateApiKey = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Task 1: Basic Express Server Setup
// Implement a "Hello World" route at the root endpoint
app.get('/', (req, res) => {
    res.send('Hello World! Welcome to the Express.js API.');
});

// Task 3: Middleware Implementation
// Custom logger middleware
app.use(loggerMiddleware);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
// Alternatively, for Express 4.16.0+
// app.use(express.json());

// Authentication middleware (apply to API routes that require it)
// For this example, we'll apply it to all /api routes
app.use('/api', authenticateApiKey);

// Task 2 & 5: RESTful API Routes & Advanced Features
// Mount product routes under /api/products
app.use('/api/products', productRoutes);

// Task 4: Error Handling
// Global error handling middleware (must be the last middleware)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the API at http://localhost:${PORT}`);
});
