const express = require('express');
const router = express.Router();

//User tasks
const { createUser, loginUser } = require('../controllers/userTasks');


// Product tasks
const { createProduct, displayProducts, deleteProducts, displayComponents, createComponent, deleteComponent, displayParts, createParts, deletePart } = require('../controllers/productTasks');

//Instance tasks
const { validateSerial, createNewInstance, deleteInstance, updateProgressCompleted, updateProgressArchived, getAssembledCounts, getArchivedInstances, trackInstance, getInstance, getLogs } = require('../controllers/instanceTasks');

router.post('/register', createUser);

router.post('/login', loginUser);

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

router.route('/instance/:productName/:instanceId/assembled-counts').get(getAssembledCounts)

router.route('/instance/:productName/:instanceId').post(validateSerial)

router.route('/instance/:productName/:instanceId').delete(deleteInstance)

router.route('/instance/:productName/:instanceId/completed').patch(updateProgressCompleted)

router.route('/instance/:productName/:instanceId/archived').patch(updateProgressArchived)

router.route('/archived-instances').get(getArchivedInstances)

router.route('/track-instance').post(trackInstance)

router.route('/track-instance/:instanceId').get(getInstance)

router.route('/logs').get(getLogs)

module.exports = router;