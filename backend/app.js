require('./db/connect')
const express = require('express');
const tasks = require('./routes/tasks');

const app = express();

//middleware
app.use(express.json())

app.get('/hello', (req, res) => {
  res.send("hello")
})

app.use("/api/v1/tasks", tasks);

const port = 5000;

app.listen(port, () => {
  // console.log(`App is listening on port ${port}...`);
});