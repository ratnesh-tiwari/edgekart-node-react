const express = require('express');
const {
  getAllOrders,
  getOneOrder,
  createAnOrder,
} = require('../controller/orderController');
const { isAuthenticatedUser } = require('../controller/authContorller');

const router = express.Router();

router.route('/').get(getAllOrders).post(isAuthenticatedUser, createAnOrder);
router.route('/:id').get(getOneOrder);

module.exports = router;
