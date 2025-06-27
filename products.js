const { v4: uuidv4 } = require('uuid');

let products = [
    {
        id: uuidv4(),
        name: 'Laptop Pro X',
        description: 'Powerful laptop for professionals with 16GB RAM and 512GB SSD.',
        price: 1200,
        category: 'Electronics',
        inStock: true
    },
    {
        id: uuidv4(),
        name: 'Wireless Mouse Ergo',
        description: 'Ergonomic wireless mouse with adjustable DPI.',
        price: 25,
        category: 'Electronics',
        inStock: true
    },
    {
        id: uuidv4(),
        name: 'Mechanical Keyboard RGB',
        description: 'Gaming mechanical keyboard with customizable RGB lighting.',
        price: 80,
        category: 'Electronics',
        inStock: false
    },
    {
        id: uuidv4(),
        name: 'Desk Lamp LED',
        description: 'Modern LED desk lamp with touch control and dimming.',
        price: 45,
        category: 'Home & Office',
        inStock: true
    },
    {
        id: uuidv4(),
        name: 'Smartwatch Sport',
        description: 'Fitness smartwatch with heart rate monitoring and GPS.',
        price: 150,
        category: 'Wearables',
        inStock: true
    }
];

module.exports = products;
