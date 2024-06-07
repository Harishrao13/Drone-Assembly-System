const express = require('express');
const tasks = require('./api/routes/tasks');
require('dotenv').config();
const connectDB = require('./db/connect')
const app = express();

//middleware
app.use(express.json())

app.get('/hello', (req, res) => {
  res.send("hello")
})

app.use("/api/v1", tasks);

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.error(error)
  }
}

start()