// src/components/AdminInventory.js
import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    TextField,
    Snackbar,
    Alert,
} from '@mui/material';

const MAX_CAPACITY = 100; // Define the maximum capacity of the inventory

const Invent = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [demandCategory, setDemandCategory] = useState('medium');
    const [quantityInStock, setQuantityInStock] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Fetch products from a local state or mock data for now
    useEffect(() => {
        // Mock data for demonstration purposes
        const mockProducts = [
            { productName: 'Product 1', price: 25.0, expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), demandCategory: 'High Demand', quantityInStock: 20 },
            { productName: 'Product 2', price: 15.0, expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), demandCategory: 'Medium Demand', quantityInStock: 15 },
            { productName: 'Product 3', price: 5.0, expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), demandCategory: 'Low Demand', quantityInStock: 10 },
        ];
        setProducts(mockProducts);
    }, []);

    const handleAddProduct = () => {
        // Calculate current counts by demand category
        const highDemandCount = products.filter(p => p.demandCategory === 'High Demand').reduce((sum, p) => sum + p.quantityInStock, 0);
        const mediumDemandCount = products.filter(p => p.demandCategory === 'Medium Demand').reduce((sum, p) => sum + p.quantityInStock, 0);
        const lowDemandCount = products.filter(p => p.demandCategory === 'Low Demand').reduce((sum, p) => sum + p.quantityInStock, 0);

        // Validate capacity constraints
        if (demandCategory === 'High Demand' && highDemandCount + parseInt(quantityInStock) > MAX_CAPACITY * 0.5) {
            setSnackbarMessage('Warning: High demand products exceed 50% of max capacity!');
            setSnackbarOpen(true);
            return;
        }
        if (demandCategory === 'Medium Demand' && mediumDemandCount + parseInt(quantityInStock) > MAX_CAPACITY * 0.3) {
            setSnackbarMessage('Warning: Medium demand products exceed 30% of max capacity!');
            setSnackbarOpen(true);
            return;
        }
        if (demandCategory === 'Low Demand' && lowDemandCount + parseInt(quantityInStock) > MAX_CAPACITY * 0.2) {
            setSnackbarMessage('Warning: Low demand products exceed 20% of max capacity!');
            setSnackbarOpen(true);
            return;
        }

        // Add the new product to the inventory
        const newProduct = {
            productName,
            price: parseFloat(price),
            expiryDate: new Date(expiryDate),
            demandCategory,
            quantityInStock: parseInt(quantityInStock),
        };
        
        setProducts([...products, newProduct]); // Update the product list
        resetForm(); // Reset form fields
    };

    const resetForm = () => {
        setProductName('');
        setPrice('');
        setExpiryDate('');
        setDemandCategory('medium');
        setQuantityInStock('');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Admin Inventory Management
            </Typography>

            <Box sx={{ marginBottom: 2 }}>
                <TextField
                    label="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    sx={{ marginTop: 2 }}
                />
                <TextField
                    label="Expiry Date"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    fullWidth
                    sx={{ marginTop: 2 }}
                />
                <TextField
                    select
                    label="Demand Category"
                    value={demandCategory}
                    onChange={(e) => setDemandCategory(e.target.value)}
                    fullWidth
                    SelectProps={{
                        native: true,
                    }}
                    sx={{ marginTop: 2 }}
                >
                    <option value="High Demand">High Demand</option>
                    <option value="Medium Demand">Medium Demand</option>
                    <option value="Low Demand">Low Demand</option>
                </TextField>
                <TextField
                    label="Quantity in Stock"
                    type="number"
                    value={quantityInStock}
                    onChange={(e) => setQuantityInStock(e.target.value)}
                    fullWidth
                    sx={{ marginTop: 2 }}
                />
                <Button variant="contained" onClick={handleAddProduct} sx={{ marginTop: 2 }}>
                    Add Product
                </Button>
            </Box>

            <Typography variant="h6">Current Inventory:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {products.map((product, index) => (
                    <Card key={index} sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.productName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Price: ${product.price}<br />
                                Expiry Date: {new Date(product.expiryDate).toLocaleDateString()}<br />
                                Demand Category: {product.demandCategory}<br />
                                Quantity in Stock: {product.quantityInStock}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="error">
                                Remove
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>

            {/* Snackbar for warnings */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Invent;
