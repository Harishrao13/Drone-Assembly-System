const express = require('express');
const router = express.Router();

// User tasks
const { createUser, loginUser } = require('../controllers/userTasks');

// Product tasks
const {
    createProduct,
    displayProducts,
    deleteProducts,
    displayComponents,
    createComponent,
    deleteComponent,
    displayParts,
    createParts,
    deletePart
} = require('../controllers/productTasks');

// Instance tasks
const {
    validateSerial,
    createNewInstance,
    deleteInstance,
    updateProgressCompleted,
    updateProgressArchived,
    getAssembledCounts,
    getArchivedInstances,
    trackInstance,
    getInstance,
    getLogs,
    reAssign
} = require('../controllers/instanceTasks');

// User routes
router.post('/register', createUser);
router.post('/login', loginUser);

// Product routes
router.route('/add-product')
    .get(displayProducts)
    .post(createProduct);

router.route('/add-product/:productName')
    .delete(deleteProducts)
    .get(displayComponents)
    .post(createComponent);

router.route('/add-product/:productName/:componentLabel')
    .delete(deleteComponent);

router.route('/add-product/:productName/:componentLabel/parts')
    .get(displayParts)
    .post(createParts);

router.route('/add-product/:productName/:componentLabel/:partLabel')
    .delete(deletePart);

// Instance routes
router.route('/initialize-instance').post(createNewInstance);

router.route('/instance/:productName/:instanceId/assembled-counts').get(getAssembledCounts);
router.route('/instance/:productName/:instanceId').post(validateSerial).delete(deleteInstance);

router.route('/instance/:productName/:instanceId/completed').patch(updateProgressCompleted);
router.route('/instance/:productName/:instanceId/archived').patch(updateProgressArchived);

router.route('/archived-instances').get(getArchivedInstances);

router.route('/track-instance').post(trackInstance);
router.route('/track-instance/:instanceId').get(getInstance);
router.route('/reassign').post(reAssign);// Removes parts assigned

router.route('/logs').get(getLogs); // For displaying in dashboard

module.exports = router;
