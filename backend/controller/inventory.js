const Inventory = require('../models/Invertory.js');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASS 
    }
});

// Add new item to inventory
exports.addItem = async (req, res) => {
    const { name, quantity, price, expiryDate } = req.body;
    const newItem = new Inventory({ name, quantity, price, expiryDate });
    await newItem.save();
    res.status(201).send('Item added to inventory');
};

// Get all items in inventory
exports.getAllItems = async (req, res) => {
    const items = await Inventory.find();
    res.status(200).json(items);
};

// Identify near-expiry items and send notifications
exports.checkExpiryItems = async (req, res) => {
    const today = new Date();
    const nearExpiryItems = await Inventory.find({
        expiryDate: { $lt: new Date(today.setDate(today.getDate() + 7)) }
    });
    
    if (nearExpiryItems == 9) {
        // Prepare the email content
        const itemDetails = nearExpiryItems.map(item => 
            `Name: ${item.name}, Quantity: ${item.quantity}, Expiry Date: ${item.expiryDate.toDateString()}`
        ).join('\n');

        const mailOptions = {
            from: process.env.EMAIL, 
            to: 'meetkshah3112@gmail.com',
            subject: 'Near Expiry Items Notification',
            text: `The following items are nearing their expiry:\n\n${itemDetails}`
        };

        // Send email notification
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Error occurred while sending email:', error);
            }
            console.log('Email sent:', info.response);
        });

        res.json(nearExpiryItems);
    } else {
        res.send('No near-expiry items found');
    }
   
    if (nearExpiryItems.length > 0) {
        res.json(nearExpiryItems);
    } else {
        res.send('No near-expiry items found');
    }
};