// const express = require('express');
// const inventory = require("../controller/inventory.js");

// const router = express.Router();

// router.post('/add', inventory.addItem);
// router.get('/inven', inventory.getAllItems);
// router.get('/check-expiry', inventory.checkExpiryItems);

// module.exports = router;

// const express = require('express');
// const authenticateAdmin = require('../middlewares/auth');
// const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/inventory');

// const router = express.Router();

// // Route to add new product to inventory
// router.post('/add', authenticateAdmin, addProduct);

// // Route to get all products in inventory
// router.get('/', getAllProducts);

// // Route to get a product by its productId
// router.get('/:productId', getProductById);

// // Route to update product details by productId
// router.put('/:productId',  authenticateAdmin, updateProduct);

// // Route to delete product by productId
// router.delete('/:productId',  authenticateAdmin,  deleteProduct);

// module.exports = router;


/**Newly */
const express = require('express');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/inventory');
const authenticateAdmin = require('../middlewares/auth');

const router = express.Router();

// Routes
router.post('/add', authenticateAdmin, addProduct); // Add product (JSON payload)
router.get('/', getProducts); // Fetch all products
router.put('/:id', authenticateAdmin, updateProduct); // Update product by ID
router.delete('/:id', authenticateAdmin, deleteProduct); // Delete product by ID

module.exports = router;
