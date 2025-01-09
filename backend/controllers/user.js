const User = require('../models/User');
const Inventory = require('../models/inventory');  // Assuming Inventory model is available
const jwt = require('jsonwebtoken');

// User Signup
exports.userSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Respond with success
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error signing up user', error: error.message });
  }
};

// User Login
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if password is correct
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
};

// Buy Product
exports.buyProduct = async (req, res) => {
  try {
    const user = req.user;  // Get authenticated user from request object
    const { productId, quantity } = req.body;

    // Find the product by ID
    const product = await Inventory.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Apply dynamic pricing logic based on expiry date
    const currentDate = new Date();
    const expiryDate = new Date(product.expiryDate);
    const expiryDifference = (expiryDate - currentDate) / (1000 * 3600 * 24);  // Calculate days difference

    let finalPrice = product.price;

    // Logic based on expiry date difference
    if (expiryDifference < 10) {
      return res.status(400).json({ message: 'Product is going to charity, cannot purchase' });
    } else if (expiryDifference < 50) {
      finalPrice = product.price * 0.8;  // Apply 20% discount
    }

    // Calculate total price based on quantity
    const totalPrice = finalPrice * quantity;

    // Update the user's credit score and add a voucher after purchase
    const updatedCredits = Math.min(user.credits + 100, 1000);  // Max credit is 1000
    const voucher = `Voucher_${Date.now()}`;

    // Update user's credits and vouchers
    await User.findByIdAndUpdate(user._id, {
      credits: updatedCredits,
      $push: {
        vouchers: voucher, // Add the new voucher to the vouchers array
        buyProducts: {
          productId,
          quantity,
          price: totalPrice,
          purchaseDate: new Date(),  // Store purchase date
        },
      },
    });

    res.status(200).json({
      message: 'Product purchased successfully',
      finalPrice,
      credits: updatedCredits,
      voucher,
      totalPrice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error purchasing product', error: error.message });
  }
};


exports.getPurchasedProducts = async (req, res) => {
    try {
      const { userId } = req.params; // Extract userId from route parameters
  
      // Find the user by ID and populate the 'buyProducts' field
      const userWithPurchases = await User.findById(userId)
        .populate('buyProducts.productId') // Populate product details
        .select('buyProducts'); // Select only the 'buyProducts' field
  
      // Check if the user exists and has purchased products
      if (!userWithPurchases) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (userWithPurchases.buyProducts.length === 0) {
        return res.status(404).json({ message: 'No purchased products found for this user' });
      }
  
      // Return the purchased products
      res.status(200).json({
        message: 'Purchased products retrieved successfully',
        purchases: userWithPurchases.buyProducts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving purchased products', error: error.message });
    }
  };
  