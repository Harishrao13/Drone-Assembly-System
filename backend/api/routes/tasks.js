const express = require('express');
const router = express.Router();

//User tasks
const { getAllTasks, createUser, findUser, } = require('../controllers/userTasks');

// Product tasks
const { createProduct, displayProducts, deleteProducts, displayComponents, createComponent, deleteComponent, displayParts, createParts, deletePart } = require('../controllers/productTasks');

//Instance tasks
const { validateSerial, createNewInstance, deleteInstance, updateProgressCompleted, updateProgressArchived } = require('../controllers/instanceTasks');

router.route('/').get(getAllTasks);

router.route('/').post(createUser);``

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


//Instance routes
router.route('/initialize-instance').post(createNewInstance)

router.route('/new-instance/:productName/:instanceId').post(validateSerial)

router.route('/new-instance/:productName/:instanceId').delete(deleteInstance)

router.route('/new-instance/:productName/:instanceId/completed').patch(updateProgressCompleted)

router.route('/new-instance/:productName/:instanceId/archived').patch(updateProgressArchived)

module.exports = router;