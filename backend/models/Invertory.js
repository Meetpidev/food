const mongoose = require('mongoose');

const Invertory = new mongoose.Schema({
    ProductId: {type: String, required: true},
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
});

module.exports = mongoose.model('Inventory', Invertory);
