const express = require('express');
const tasks = require('./api/routes/tasks');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db/connect');
const app = express();

// CORS options
const corsOpts = {
  origin: '*',
  methods: ['GET', 'POST'],
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

// Apply tasks routes
app.use("/api/v1", tasks);

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
