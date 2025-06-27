[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19862840&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

- # Express.js RESTful API

This project builds a RESTful API using Express.js, implementing standard CRUD operations, proper routing, middleware, and comprehensive error handling. It also includes advanced features like filtering, pagination, and search for products.

## 🛠️ Setup

### Prerequisites

* Node.js (v18 or higher recommended)
* npm (Node Package Manager)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-github-classroom-repo-link>
    cd express-api-project
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Environment Variables

Create a file named `.env` in the root directory of your project and add the following:


PORT=3000
API_KEY=your-secret-api-key

* `PORT`: The port on which the server will listen.
* `API_KEY`: A secret key required for authenticating requests to the `/api` endpoints.

### Running the Server

To start the server in development mode (with `nodemon` for auto-restarts):

```bash
npm run dev

To start the server in production mode:
npm start

The server will be running on http://localhost:3000 (or the port you configured in .env).
🚀 API Endpoints Documentation
All API endpoints are prefixed with /api. An X-API-Key header with the value from your .env file (your-secret-api-key by default) is required for all /api endpoints.
Base Endpoint
 * GET /
   * Description: A simple "Hello World" route to confirm the server is running.
   * Response: Hello World! Welcome to the Express.js API.
Products Resource (/api/products)
1. List all products
 * GET /api/products
   * Description: Retrieves a list of all products. Supports filtering, searching, and pagination.
   * Query Parameters:
     * category (optional, string): Filters products by category (case-insensitive).
     * search (optional, string): Searches product names (case-insensitive, partial match).
     * page (optional, integer, default: 1): The page number for pagination.
     * limit (optional, integer, default: 10): The number of items per page.
   * Example Request:
     curl -X GET "http://localhost:3000/api/products?category=Electronics&search=laptop&page=1&limit=5" \
     -H "X-API-Key: your-secret-api-key"

   * Example Response (200 OK):
     {
    "products": [
        {
            "id": "...",
            "name": "Laptop Pro X",
            "description": "...",
            "price": 1200,
            "category": "Electronics",
            "inStock": true
        }
    ],
    "totalProducts": 1,
    "totalPages": 1,
    "currentPage": 1,
    "itemsPerPage": 5
}

2. Get a specific product by ID
 * GET /api/products/:id
   * Description: Retrieves a single product by its unique ID.
   * URL Parameters:
     * id (string, required): The unique identifier of the product.
   * Example Request:
     curl -X GET "http://localhost:3000/api/products/a1b2c3d4-e5f6-7890-1234-567890abcdef" \
     -H "X-API-Key: your-secret-api-key"

   * Example Response (200 OK):
     {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "name": "Laptop Pro X",
    "description": "Powerful laptop for professionals with 16GB RAM and 512GB SSD.",
    "price": 1200,
    "category": "Electronics",
    "inStock": true
}

   * Example Error Response (404 Not Found):
     {
    "status": "error",
    "name": "NotFoundError",
    "message": "Product with ID non-existent-id not found."
}

3. Create a new product
 * POST /api/products
   * Description: Creates a new product. Requires a JSON request body with product details.
   * Request Body:
     {
    "name": "New Smartphone",
    "description": "Latest model smartphone with advanced camera.",
    "price": 899.99,
    "category": "Electronics",
    "inStock": true
}

   * Example Request:
     curl -X POST "http://localhost:3000/api/products" \
     -H "Content-Type: application/json" \
     -H "X-API-Key: your-secret-api-key" \
     -d '{
           "name": "New Smartphone",
           "description": "Latest model smartphone with advanced camera.",
           "price": 899.99,
           "category": "Electronics",
           "inStock": true
         }'

   * Example Response (201 Created):
     {
    "id": "new-product-uuid",
    "name": "New Smartphone",
    "description": "Latest model smartphone with advanced camera.",
    "price": 899.99,
    "category": "Electronics",
    "inStock": true
}

   * Example Error Response (400 Bad Request - Validation Error):
     {
    "status": "error",
    "name": "ValidationError",
    "message": "Product name is required and must be a non-empty string."
}

4. Update an existing product
 * PUT /api/products/:id
   * Description: Updates an existing product identified by its ID. Requires a JSON request body with updated product details.
   * URL Parameters:
     * id (string, required): The unique identifier of the product to update.
   * Request Body: (Same structure as POST, all fields are expected)
     {
    "name": "Updated Laptop Pro X",
    "description": "Updated description for the powerful laptop.",
    "price": 1250.00,
    "category": "Electronics",
    "inStock": false
}

   * Example Request:
     curl -X PUT "http://localhost:3000/api/products/a1b2c3d4-e5f6-7890-1234-567890abcdef" \
     -H "Content-Type: application/json" \
     -H "X-API-Key: your-secret-api-key" \
     -d '{
           "name": "Updated Laptop Pro X",
           "description": "Updated description for the powerful laptop.",
           "price": 1250.00,
           "category": "Electronics",
           "inStock": false
         }'

   * Example Response (200 OK):
     {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "name": "Updated Laptop Pro X",
    "description": "Updated description for the powerful laptop.",
    "price": 1250,
    "category": "Electronics",
    "inStock": false
}

   * Example Error Response (404 Not Found):
     {
    "status": "error",
    "name": "NotFoundError",
    "message": "Product with ID non-existent-id not found."
}

5. Delete a product
 * DELETE /api/products/:id
   * Description: Deletes a product identified by its ID.
   * URL Parameters:
     * id (string, required): The unique identifier of the product to delete.
   * Example Request:
     curl -X DELETE "http://localhost:3000/api/products/a1b2c3d4-e5f6-7890-1234-567890abcdef" \
     -H "X-API-Key: your-secret-api-key"

   * Example Response (204 No Content): (No response body)
   * Example Error Response (404 Not Found):
     {
    "status": "error",
    "name": "NotFoundError",
    "message": "Product with ID non-existent-id not found."
}

6. Get Product Statistics
 * GET /api/products/statistics
   * Description: Provides various statistics about products, such as total count, count by category, and in-stock/out-of-stock counts.
   * Example Request:
     curl -X GET "http://localhost:3000/api/products/statistics" \
     -H "X-API-Key: your-secret-api-key"

   * Example Response (200 OK):
     {
    "totalProducts": 5,
    "productsByCategory": {
        "Electronics": 3,
        "Home & Office": 1,
        "Wearables": 1
    },
    "inStockCount": 4,
    "outOfStockCount": 1
}

Error Handling
The API implements global error handling, returning consistent JSON error responses with appropriate HTTP status codes.
 * Unauthorized Error (401):
   {
    "status": "error",
    "name": "UnauthorizedError",
    "message": "Unauthorized: Invalid or missing API key."
}

 * Validation Error (400):
   {
    "status": "error",
    "name": "ValidationError",
    "message": "Product price is required and must be a positive number."
}

 * Not Found Error (404):
   {
    "status": "error",
    "name": "NotFoundError",
    "message": "Product with ID XYZ not found."
}

 * Internal Server Error (500):
   {
    "status": "error",
    "name": "InternalServerError",
    "message": "An unexpected error occurred."
}
