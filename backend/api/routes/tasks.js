const express = require('express');
const router = express.Router();

const { getAllTasks, createUser, findUser } = require('../controllers/tasks');
const { find } = require('../models/users');

router.route('/').get(getAllTasks);

router.route('/').post(createUser);

router.route('/find').post(findUser)

module.exports = router;