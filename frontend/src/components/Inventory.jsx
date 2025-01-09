// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import CardActionArea from '@mui/material/CardActionArea';
// import Button from '@mui/material/Button';
// import CardActions from '@mui/material/CardActions';
// import Alert from '@mui/material/Alert';

// const products = Array.from({ length: 10 }, (_, index) => {
//     const originalPrice = (Math.random() * 100).toFixed(2);
//     const expireDate = new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000);
//     return {
//         id: index + 1,
//         name: `Product ${index + 1}`,
//         originalPrice,
//         expireDate,
//         createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random createdAt date
//         formattedExpireDate: expireDate.toLocaleDateString(),
//     };
// });

// const Inventory = () => {
//     const [error, setError] = useState('');
//     const [credits, setCredits] = useState(0);

//     const calculatePrice = (product) => {
//         const currentDate = new Date();
//         const expiryDate = new Date(product.expireDate);
//         const totalDaysRemaining = (expiryDate - currentDate) / (1000 * 60 * 60 * 24); // Total days remaining
//         const originalDifference = (expiryDate - product.createdAt) / (1000 * 60 * 60 * 24); // Original difference in days

//         if (totalDaysRemaining < 0) {
//             return null; // Product expired
//         }

//         if (totalDaysRemaining < originalDifference * 0.1) {
//             return null; // Product goes to charity
//         } else if (totalDaysRemaining < originalDifference * 0.5) {
//             const discountedPrice = (product.originalPrice * 0.8).toFixed(2); // Apply 20% discount
//             return { price: discountedPrice, discount: true };
//         } else {
//             return { price: product.originalPrice, discount: false }; // Original price
//         }
//     };

//     const handleBuyClick = (product) => {
//         const priceInfo = calculatePrice(product);
        
//         if (!priceInfo) {
//             setError(`Product ${product.name} goes to charity and cannot be purchased.`);
//             return;
//         }

//         // If product is purchasable with discount
//         if (priceInfo.discount) {
//             setCredits(prevCredits => Math.min(prevCredits + 100, 1000)); // Add credits, max 1000
//             alert(`You bought ${product.name} for $${priceInfo.price}. Credits earned!`);
//         } else {
//             alert(`You bought ${product.name} for $${priceInfo.price}.`);
//         }
        
//         setError(''); // Clear any previous error messages
//     };

//     return (
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', padding: 2 }}>
//             {products.map(product => {
//                 const priceInfo = calculatePrice(product);
//                 return (
//                     <Card key={product.id} sx={{ maxWidth: 345 }}>
//                         <CardActionArea>
//                             <CardMedia
//                                 component="img"
//                                 height="140"
//                                 image="https://via.placeholder.com/140"
//                                 alt={product.name}
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     {product.name}
//                                 </Typography>
//                                 <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                                     Price: {priceInfo ? `$${priceInfo.price}` : 'N/A'} <br />
//                                     Expiration Date: {product.formattedExpireDate} <br />
//                                     {priceInfo === null && <strong>This item goes to charity.</strong>}
//                                 </Typography>
//                             </CardContent>
//                         </CardActionArea>
//                         <CardActions>
//                             {priceInfo !== null ? (
//                                 <Button 
//                                     size="small" 
//                                     variant="contained" 
//                                     color="primary" 
//                                     onClick={() => handleBuyClick(product)}
//                                 >
//                                     Buy Now
//                                 </Button>
//                             ) : (
//                                 <Button size="small" disabled>
//                                     Cannot Buy (Charity)
//                                 </Button>
//                             )}
//                         </CardActions>
//                         {error && (
//                             <Box sx={{ padding: 2 }}>
//                                 <Alert severity="error">{error}</Alert>
//                             </Box>
//                         )}
//                     </Card>
//                 );
//             })}
//             {/* Display credits */}
//             <Typography variant="h6" sx={{ marginTop: 2 }}>
//                 Total Credits: {credits}
//             </Typography>
//         </Box>
//     );
// };

// export default Inventory;
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const products = Array.from({ length: 10 }, (_, index) => {
    const originalPrice = (Math.random() * 100).toFixed(2);
    const expireDate = new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000);
    return {
        id: index + 1,
        name: `Product ${index + 1}`,
        originalPrice,
        expireDate,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random createdAt date
        formattedExpireDate: expireDate.toLocaleDateString(),
    };
});

const Inventory = () => {
    const [error, setError] = useState('');
    const [credits, setCredits] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const calculatePrice = (product) => {
        const currentDate = new Date();
        const expiryDate = new Date(product.expireDate);
        const totalDaysRemaining = (expiryDate - currentDate) / (1000 * 60 * 60 * 24); // Total days remaining
        const originalDifference = (expiryDate - product.createdAt) / (1000 * 60 * 60 * 24); // Original difference in days

        if (totalDaysRemaining < 0) {
            return null; // Product expired
        }

        if (totalDaysRemaining < originalDifference * 0.1) {
            return null; // Product goes to charity
        } else if (totalDaysRemaining < originalDifference * 0.5) {
            const discountedPrice = (product.originalPrice * 0.8).toFixed(2); // Apply 20% discount
            return { price: discountedPrice, originalPrice: product.originalPrice, discount: true };
        } else {
            return { price: product.originalPrice, originalPrice: product.originalPrice, discount: false }; // Original price
        }
    };

    const handleBuyClick = (product) => {
        const priceInfo = calculatePrice(product);
        
        // // Check if the product goes to charity
        // if (priceInfo && priceInfo.charity==null) {
        // //     setError(`Product ${product.name} goes to charity and cannot be purchased.`);
            
        // //     setSnackbarOpen(true);
        // //     return;
        // // }

        if (!priceInfo) {
            setError(`Product ${product.name} goes to charity and cannot be purchased.`);
            setSnackbarMessage(`Product ${product.name} goes to charity and cannot be purchased.`);
            setSnackbarOpen(true);  
            return;
        }

        // Handle purchasing logic for valid products
        if (!priceInfo) {
            setError(`Product ${product.name} cannot be purchased.`);
            return;
        }

        // Prepare the message for Snackbar
        let message;
        if (priceInfo.discount) {
            setCredits(prevCredits => Math.min(prevCredits + 100, 1000)); // Add credits, max 1000
            message = `You bought ${product.name} for $${priceInfo.price}. Original Price: $${priceInfo.originalPrice}. Discount applied because you bought it near expiry!`;
        } else {
            message = `You bought ${product.name} for $${priceInfo.price}.`;
        }
        
        setSnackbarMessage(message);
        setSnackbarOpen(true);
        
        setError(''); // Clear any previous error messages
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', padding: 2 }}>
            {products.map(product => {
                const priceInfo = calculatePrice(product);
                return (
                    <Card key={product.id} sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://via.placeholder.com/140"
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {priceInfo ? (
                                        <>
                                            Price: 
                                            {priceInfo.discount ? (
                                                <>
                                                    <span style={{ textDecoration: 'line-through' }}>
                                                        ${priceInfo.originalPrice}
                                                    </span> {' '}
                                                    <strong>${priceInfo.price}</strong>
                                                </>
                                            ) : (
                                                `$${priceInfo.price}`
                                            )}
                                        </>
                                    ) : 'N/A'} <br />
                                    Expiration Date: {product.formattedExpireDate} <br />
                                    {priceInfo?.charity && <strong>This item goes to charity.</strong>}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            {priceInfo && !priceInfo.charity ? (
                                <Button 
                                    size="small" 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => handleBuyClick(product)}
                                >
                                    Buy Now
                                </Button>
                            ) : (
                                <Button size="small" disabled>
                                    Cannot Buy (Charity)
                                </Button>
                            )}
                        </CardActions>
                        {error && (
                            <Box sx={{ padding: 2 }}>
                                <Alert severity="error">{error}</Alert>
                            </Box>
                        )}
                    </Card>
                );
            })}
            {/* Display credits */}
            <Typography variant="h6" sx={{ marginTop: 2 }}>
                Total Credits: {credits}
            </Typography>

            {/* Snackbar for purchase notifications */}
            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default Inventory;
