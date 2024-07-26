const express = require('express');
const tasks = require('./api/routes/tasks');
const authRoutes = require('./api/routes/authRoutes');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const corsOpts = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOpts));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/hello', (req, res) => {
  res.send("hello");
});

// API routes
app.use("/api/v1", tasks);
app.use("/api/v1/auth", authRoutes);

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
