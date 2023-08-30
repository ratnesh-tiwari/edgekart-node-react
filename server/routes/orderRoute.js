const express = require('express');
const {
  getAllOrders,
  getOneOrder,
  createAnOrder,
  getOrderStats,
  getMonthlyStats,
} = require('../controller/orderController');
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require('../controller/authContorller');

const router = express.Router();

// adding authentication so this route can be access by logged in users only
router.use(isAuthenticatedUser);

router.route('/stats').get(authorizedRoles('admin'), getOrderStats);
router
  .route(authorizedRoles('admin'), '/monthly-order/:year')
  .get(getMonthlyStats);

router
  .route('/')
  .get(authorizedRoles('admin'), getAllOrders)
  .post(authorizedRoles('delivery-partner', 'seller'), createAnOrder);

router.route('/:id').get(getOneOrder);

module.exports = router;
