const express = require('express');
const router = express.Router();

const { getAllTasks, createUser, findUser, } = require('../controllers/userTasks');
const { createProduct, displayProducts, deleteProducts, displayComponents, createComponent, deleteComponent, displayParts, createParts, deletePart } = require('../controllers/productTasks');

router.route('/').get(getAllTasks);

router.route('/').post(createUser);

router.route('/find').post(findUser)

router.route('/add-product').get(displayProducts)

router.route('/add-product/:productName').delete(deleteProducts)

router.route('/add-product').post(createProduct)

router.route('/add-product/:productName').get(displayComponents)

router.route('/add-product/:productName').post(createComponent)

router.route('/add-product/:productName/:componentLabel').delete(deleteComponent)

router.route('/add-product/:productName/:componentLabel/parts').get(displayParts)

router.route('/add-product/:productName/:componentLabel/parts').post(createParts)

router.route('/add-product/:productName/:componentLabel/:partLabel').delete(deletePart)

module.exports = router;