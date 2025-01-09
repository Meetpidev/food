const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // User's hashed password
  credits: { type: Number, default: 0 }, // User's credit score
  vouchers: [{ type: String }], // List of vouchers
  buyProducts: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }, // Reference to Inventory
      quantity: { type: Number, required: true }, // Quantity purchased
      purchaseDate: { type: Date, default: Date.now }, // Purchase date
      price: { type: Number, required: true }, // Price at which the product was bought
    },
  ],
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check password validity
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
