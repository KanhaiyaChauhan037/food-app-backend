const express = require('express');
const bodyParser = require('body-parser');
const connectDatabase = require('./utils/database');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 5500;

// Connect to the database
connectDatabase();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/menu', menuRoutes);
app.use('/order', orderRoutes);

// Start the server
app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
});
