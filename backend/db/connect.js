// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;
const mongoDBURL =
  'mongodb+srv://f20220486:stargamer13@cluster0.tl4oojo.mongodb.net/AnonVote?retryWrites=true&w=majority';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB and start the server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to database: ${error}`);
  });

// mongodb://f20220486:LVQfyK*8_J9e@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true