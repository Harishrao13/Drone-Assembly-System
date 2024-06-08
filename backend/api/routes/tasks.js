const express = require('express');
const router = express.Router();

const { getAllTasks, createUser, findUser,createProduct, displayProduct } = require('../controllers/tasks');
// const { find } = require('../models/users');

router.route('/').get(getAllTasks);

router.route('/').post(createUser);

router.route('/find').post(findUser)

router.route('/add-product').post(createProduct)

router.route('/add-product').get(displayProduct)

module.exports = router;