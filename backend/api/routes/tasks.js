const express = require('express');
const router = express.Router();

const { getAllTasks, createUser, findUser,createProduct, displayProducts, displayComponents, createComponent, displayParts, createParts } = require('../controllers/tasks');

router.route('/').get(getAllTasks);

router.route('/').post(createUser);

router.route('/find').post(findUser)

router.route('/add-product').get(displayProducts)

router.route('/add-product').post(createProduct)

router.route('/add-product/:productName').get(displayComponents)

router.route('/add-product/:productName').post(createComponent)

router.route('/add-product/:productName/:componentLabel/parts').get(displayParts)

router.route('/add-product/:productName/:componentLabel/parts').post(createParts)

module.exports = router;