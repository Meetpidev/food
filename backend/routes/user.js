const express = require('express');
const { userSignup, userLogin, buyProduct, getPurchasedProducts } = require('../controllers/user');
const authenticateUser = require('../middlewares/auth');  // Use user authentication middleware

const router = express.Router();

// User Signup route
router.post('/signup', userSignup);

// User Login route
router.post('/login', userLogin);

// User Buy Product route
router.post('/buy', authenticateUser, buyProduct);  // Protected route, requires authentication

// Route to fetch all purchased products by the user
router.get('/purchases/:userId', authenticateUser, getPurchasedProducts);

module.exports = router;
