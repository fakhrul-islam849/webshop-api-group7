const express = require('express');
const OrderController = require('../controllers/OrderController');

const router = express.Router();
const userAuth = require('../middlewares/userAuth');
const auth = require('../middlewares/auth');

const orderController = new OrderController();

router.get('/data-table', auth(), orderController.orderDataTable);
router.get('/details/:id', auth(), orderController.orderDetailsById);
router.get('/user-based', userAuth(), orderController.userBasedOrder);
router.get('/save-order', userAuth(), orderController.save);

module.exports = router;
