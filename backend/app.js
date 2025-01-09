const express = require('express');
const addminRoutes = require("./routes/admin.js");

const cors = require('cors');



const app = express();

const connectDB = require('./config/db');

connectDB();
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/admin", addminRoutes);
app.use('/api/inventory', inventoryRoutes);

app.use("/", (req, res) => {
    res.send("Hello, World!");
});


app.listen(3000);