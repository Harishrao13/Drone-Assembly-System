const express = require('express');
const tasks = require('./api/routes/tasks');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

// CORS options
const corsOpts = {
  origin: '*', // Adjust this in production to allow only trusted origins
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type'],
};

// Apply CORS middleware
app.use(cors(corsOpts));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/hello', (req, res) => {
  res.send("hello");
});

// API routes
app.use("/api/v1", tasks);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

start();
