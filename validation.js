const { ValidationError } = require('../utils/errors');

const validateProduct = (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return next(new ValidationError('Product name is required and must be a non-empty string.'));
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
        return next(new ValidationError('Product description is required and must be a non-empty string.'));
    }
    if (typeof price !== 'number' || price <= 0) {
        return next(new ValidationError('Product price is required and must be a positive number.'));
    }
    if (!category || typeof category !== 'string' || category.trim() === '') {
        return next(new ValidationError('Product category is required and must be a non-empty string.'));
    }
    if (typeof inStock !== 'boolean') {
        return next(new ValidationError('Product inStock status is required and must be a boolean.'));
    }

    next();
};

module.exports = {
    validateProduct
};
