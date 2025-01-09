const Inventory = require('../models/inventory');

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { productId, productName, price, expiryDate, demandCategory, productSales, quantityInStock, image } = req.body;

        // Ensure all required fields are provided
        if (!productId || !productName || !price || !expiryDate || !demandCategory || !productSales || !quantityInStock || !image) {
            return res.status(400).json({ message: 'All fields, including image, are required' });
        }

        // Add product
        const newProduct = await Inventory.addProduct(
            { productId, productName, price, expiryDate, demandCategory, productSales, quantityInStock, image },
            1000 // Replace with your actual max storage capacity
        );

        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Inventory.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Inventory.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, price, expiryDate, demandCategory, productSales, quantityInStock, image } = req.body;

        // Prepare updated data
        const updatedData = { productName, price, expiryDate, demandCategory, productSales, quantityInStock, image };

        const updatedProduct = await Inventory.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Inventory.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
