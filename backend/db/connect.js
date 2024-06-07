const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const connectDB = (url) => {
    mongoose.connect(url)
}

module.exports = connectDB;