const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./config/db');
const adminRoutes = require("./routes/admin");
const inventoryRoutes = require("./routes/inventory");
const userRoutes = require("./routes/user");  // Import user routes

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/admin", adminRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/user", userRoutes);  // Use user routes

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
