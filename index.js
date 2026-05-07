require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');
const routes = require('./routes');

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

// Routes
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});