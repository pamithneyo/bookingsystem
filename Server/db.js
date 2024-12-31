const mongoose = require("mongoose");

const mongoURL = 'mongodb+srv://pamithneyomal:pamithneyo@cluster0.gixlukj.mongodb.net/mern-booking';

// Connect to MongoDB
mongoose.connect(mongoURL)
    .then(() => console.log("MongoDB connection successful"))
    .catch((err) => console.error("MongoDB connection failed:", err));

// Get the connection instance
const connection = mongoose.connection;

// Handle connection events
connection.on('error', () => {
    console.error("MongoDB connection error");
});

connection.on('connected', () => {
    console.log("MongoDB connected");
});

module.exports = mongoose;

