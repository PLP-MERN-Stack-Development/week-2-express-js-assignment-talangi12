const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
let products = require('../data/products'); // Our in-memory data
const { NotFoundError, ValidationError } = require('../utils/errors');
const { validateProduct } = require('../middleware/validation');

// Helper to wrap async functions for error handling
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * @swagger
 * /api/products:
 * get:
 * summary: List all products with optional filtering, pagination, and search
 * parameters:
 * - in: query
 * name: category
 * schema:
 * type: string
 * description: Filter products by category
 * - in: query
 * name: search
 * schema:
 * type: string
 * description: Search products by name
 * - in: query
 * name: page
 * schema:
 * type: integer
 * default: 1
 * description: Page number for pagination
 * - in: query
 * name: limit
 * schema:
 * type: integer
 * default: 10
 * description: Number of items per page for pagination
 * responses:
 * 200:
 * description: A list of products
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Product'
 * 500:
 * description: Server error
 */
router.get('/', asyncHandler(async (req, res) => {
    let filteredProducts = [...products]; // Create a mutable copy

    // 1. Filtering by category
    const { category, search, page = 1, limit = 10 } = req.query;

    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // 2. Searching by name
    if (search) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    // 3. Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = parseInt(page) * parseInt(limit);

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / parseInt(limit));

    res.status(200).json({
        products: paginatedProducts,
        totalProducts,
        totalPages,
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit)
    });
}));

/**
 * @swagger
 * /api/products/{id}:
 * get:
 * summary: Get a specific product by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The product ID
 * responses:
 * 200:
 * description: A single product
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Product'
 * 404:
 * description: Product not found
 * 500:
 * description: Server error
 */
router.get('/:id', asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = products.find(p => p.id === id);
    if (!product) {
        throw new NotFoundError(`Product with ID ${id} not found.`);
    }
    res.status(200).json(product);
}));

/**
 * @swagger
 * /api/products:
 * post:
 * summary: Create a new product
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/NewProduct'
 * responses:
 * 201:
 * description: Product created successfully
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Product'
 * 400:
 * description: Invalid input
 * 500:
 * description: Server error
 */
router.post('/', validateProduct, asyncHandler(async (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;

    // Check for duplicate product name (simple check for demonstration)
    if (products.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        throw new ValidationError(`Product with name '${name}' already exists.`);
    }

    const newProduct = {
        id: uuidv4(),
        name,
        description,
        price,
        category,
        inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
}));

/**
 * @swagger
 * /api/products/{id}:
 * put:
 * summary: Update an existing product
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The product ID
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/NewProduct'
 * responses:
 * 200:
 * description: Product updated successfully
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Product'
 * 400:
 * description: Invalid input
 * 404:
 * description: Product not found
 * 500:
 * description: Server error
 */
router.put('/:id', validateProduct, asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, category, inStock } = req.body;

    let productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
        throw new NotFoundError(`Product with ID ${id} not found.`);
    }

    // Check for duplicate name excluding the current product
    if (products.some(p => p.name.toLowerCase() === name.toLowerCase() && p.id !== id)) {
        throw new ValidationError(`Product with name '${name}' already exists.`);
    }

    const updatedProduct = {
        id,
        name,
        description,
        price,
        category,
        inStock
    };
    products[productIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
}));

/**
 * @swagger
 * /api/products/{id}:
 * delete:
 * summary: Delete a product
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The product ID
 * responses:
 * 204:
 * description: Product deleted successfully
 * 404:
 * description: Product not found
 * 500:
 * description: Server error
 */
router.delete('/:id', asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);

    if (products.length === initialLength) {
        throw new NotFoundError(`Product with ID ${id} not found.`);
    }
    res.status(204).send(); // No Content
}));

/**
 * @swagger
 * /api/products/statistics:
 * get:
 * summary: Get product statistics (e.g., count by category)
 * responses:
 * 200:
 * description: Product statistics
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * totalProducts:
 * type: integer
 * productsByCategory:
 * type: object
 * additionalProperties:
 * type: integer
 * inStockCount:
 * type: integer
 * outOfStockCount:
 * type: integer
 * 500:
 * description: Server error
 */
router.get('/statistics', asyncHandler(async (req, res) => {
    const totalProducts = products.length;
    const productsByCategory = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    const inStockCount = products.filter(p => p.inStock).length;
    const outOfStockCount = products.filter(p => !p.inStock).length;

    res.status(200).json({
        totalProducts,
        productsByCategory,
        inStockCount,
        outOfStockCount
    });
}));


module.exports = router;

// Swagger Schema Definitions (for documentation)
/**
 * @swagger
 * components:
 * schemas:
 * Product:
 * type: object
 * required:
 * - id
 * - name
 * - description
 * - price
 * - category
 * - inStock
 * properties:
 * id:
 * type: string
 * description: The unique identifier of the product
 * example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 * name:
 * type: string
 * description: The name of the product
 * example: "Laptop Pro X"
 * description:
 * type: string
 * description: A brief description of the product
 * example: "Powerful laptop for professionals."
 * price:
 * type: number
 * format: float
 * description: The price of the product
 * example: 1200.00
 * category:
 * type: string
 * description: The category the product belongs to
 * example: "Electronics"
 * inStock:
 * type: boolean
 * description: Indicates if the product is currently in stock
 * example: true
 * NewProduct:
 * type: object
 * required:
 * - name
 * - description
 * - price
 * - category
 * - inStock
 * properties:
 * name:
 * type: string
 * description: The name of the product
 * example: "Laptop Pro X"
 * description:
 * type: string
 * description: A brief description of the product
 * example: "Powerful laptop for professionals."
 * price:
 * type: number
 * format: float
 * description: The price of the product
 * example: 1200.00
 * category:
 * type: string
 * description: The category the product belongs to
 * example: "Electronics"
 * inStock:
 * type: boolean
 * description: Indicates if the product is currently in stock
 * example: true
 */
