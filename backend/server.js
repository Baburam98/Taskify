const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Debug: Log MONGO_URI to ensure it's being loaded correctly
console.log('MONGO_URI:', MONGO_URI);

if (!MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in .env file');
    process.exit(1); // Exit the process if MONGO_URI is undefined
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit the process on connection failure
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
