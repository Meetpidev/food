// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt");

// const adminSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minLength: 6, // Password length validation handled by Mongoose itself
//   },
// });

// // Middleware to hash password before saving
// adminSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   try {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds); // Hash password before saving
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// const Admin = mongoose.model('Admin', adminSchema);

// module.exports = Admin;


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },  // Role for differentiation
}, {
  timestamps: true
});

// Pre-save hook to hash the password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check password validity
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
