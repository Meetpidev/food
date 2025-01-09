const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Admin Signup (register)
exports.adminSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create new admin
    const admin = new Admin({
      name,
      email,
      password,  // The password will be hashed via pre-save hook in the model
    });

    // Save admin to database
    await admin.save();

    return res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating admin', error });
  }
};

// Admin Login (authenticate)
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await admin.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, {
      expiresIn: '7d',  // Token expiration time
    });

    return res.status(200).json({ message: 'Login successful', token, id: admin._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error logging in', error });
  }
};
