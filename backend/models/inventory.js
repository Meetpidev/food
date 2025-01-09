// const mongoose = require('mongoose');

// const inventorySchema = new mongoose.Schema({
//     productId: {
//         type: String, 
//         required: true,
//         unique: true, // Ensure unique product ID if needed
//     },
//     title: { 
//         type: String, 
//         required: true 
//     },
//     sales: { 
//         type: Number, 
//         required: true,
//         min: [0, 'Sales cannot be negative'], // Validate non-negative sales
//     },
//     price: { 
//         type: Number, 
//         required: true,
//         min: [0, 'Price cannot be negative'], // Validate non-negative price
//     },
//     expiryDate: { 
//         type: Date, 
//         required: true,
//         validate: {
//             validator: function(value) {
//                 return value > Date.now(); // Ensure expiry date is in the future
//             },
//             message: 'Expiry date must be in the future',
//         },
//     },
// }, { timestamps: true }); // Optionally add timestamps for tracking createdAt and updatedAt

// module.exports = mongoose.model('Inventory', inventorySchema);

// const mongoose = require('mongoose');

// const inventorySchema = new mongoose.Schema({
//     productId: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     productName: { 
//         type: String, 
//         required: true 
//     },
//     price: { 
//         type: Number, 
//         required: true
//     },
//     expiryDate: { 
//         type: Date, 
//         required: true
//     },
//     demandCategory: { 
//         type: String,
//         enum: ['High Demand', 'Medium Demand', 'Low Demand'],
//         required: true
//     },
//     productSales: { 
//         type: Number, 
//         required: true 
//     },
//     quantityInStock: {
//         type: Number,
//         required: true,
//         min: [0, 'Quantity cannot be negative']
//     },
// }, { timestamps: true }); // Automatically tracks created and updated timestamps

// // Method to calculate storage allocation based on demand categories
// inventorySchema.statics.calculateStorage = function (maxStorageCapacity) {
//     const maxHighDemand = maxStorageCapacity * 0.50;
//     const maxMediumDemand = maxStorageCapacity * 0.30;
//     const maxLowDemand = maxStorageCapacity * 0.20;

//     return {
//         highDemandLimit: maxHighDemand,
//         mediumDemandLimit: maxMediumDemand,
//         lowDemandLimit: maxLowDemand
//     };
// };

// // Method to add new products and ensure storage constraints are met
// inventorySchema.statics.addProduct = async function (productDetails, maxStorageCapacity) {
//     const { demandCategory, quantityInStock } = productDetails;
    
//     const { highDemandLimit, mediumDemandLimit, lowDemandLimit } = this.calculateStorage(maxStorageCapacity);

//     // Check if adding the product exceeds the storage limits based on demand category
//     if (demandCategory === 'High Demand' && quantityInStock > highDemandLimit) {
//         throw new Error(`Cannot add high-demand product. Exceeds storage limit of ${highDemandLimit}`);
//     }

//     if (demandCategory === 'Medium Demand' && quantityInStock > mediumDemandLimit) {
//         throw new Error(`Cannot add medium-demand product. Exceeds storage limit of ${mediumDemandLimit}`);
//     }

//     if (demandCategory === 'Low Demand' && quantityInStock > lowDemandLimit) {
//         throw new Error(`Cannot add low-demand product. Exceeds storage limit of ${lowDemandLimit}`);
//     }

//     // Add the product to the inventory if storage limits are satisfied
//     const newProduct = new this(productDetails);
//     return await newProduct.save();
// };

// module.exports = mongoose.model('Inventory', inventorySchema);

const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
    },
    productName: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true
    },
    expiryDate: { 
        type: Date, 
        required: true
    },
    demandCategory: { 
        type: String,
        enum: ['High Demand', 'Medium Demand', 'Low Demand'],
        required: true
    },
    productSales: { 
        type: Number, 
        required: true 
    },
    quantityInStock: {
        type: Number,
        required: true,
        min: [0, 'Quantity cannot be negative']
    },
    image: {
        type: String, // URL for the image
        required: true, // Mark it as required if necessary
    },
}, { timestamps: true }); // Automatically tracks created and updated timestamps

// Method to calculate storage allocation based on demand categories
inventorySchema.statics.calculateStorage = function (maxStorageCapacity) {
    const maxHighDemand = maxStorageCapacity * 0.50;
    const maxMediumDemand = maxStorageCapacity * 0.30;
    const maxLowDemand = maxStorageCapacity * 0.20;

    return {
        highDemandLimit: maxHighDemand,
        mediumDemandLimit: maxMediumDemand,
        lowDemandLimit: maxLowDemand
    };
};

// Method to add new products and ensure storage constraints are met
inventorySchema.statics.addProduct = async function (productDetails, maxStorageCapacity) {
    const { demandCategory, quantityInStock } = productDetails;
    
    const { highDemandLimit, mediumDemandLimit, lowDemandLimit } = this.calculateStorage(maxStorageCapacity);

    // Check if adding the product exceeds the storage limits based on demand category
    if (demandCategory === 'High Demand' && quantityInStock > highDemandLimit) {
        throw new Error(`Cannot add high-demand product. Exceeds storage limit of ${highDemandLimit}`);
    }

    if (demandCategory === 'Medium Demand' && quantityInStock > mediumDemandLimit) {
        throw new Error(`Cannot add medium-demand product. Exceeds storage limit of ${mediumDemandLimit}`);
    }

    if (demandCategory === 'Low Demand' && quantityInStock > lowDemandLimit) {
        throw new Error(`Cannot add low-demand product. Exceeds storage limit of ${lowDemandLimit}`);
    }

    // Add the product to the inventory if storage limits are satisfied
    const newProduct = new this(productDetails);
    return await newProduct.save();
};

module.exports = mongoose.model('Inventory', inventorySchema);

