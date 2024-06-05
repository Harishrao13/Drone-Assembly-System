const express = require('express');
const router = express.Router();

const { getAllTasks } = require('../controllers/tasks');

router.route('/hello1').get(getAllTasks);

// router.route('/hello1').get((req,res) => {
//   res.end("hello")
// });

module.exports = router;