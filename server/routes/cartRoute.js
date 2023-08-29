const express = require('express');

const { isAuthenticatedUser } = require('../controller/authContorller');
const {
  getCart,
  createNewCart,
  deleteCart,
} = require('../controller/cartController');
const { updateExisting } = require('../controller/factoryHandler');

const router = express.Router();

router
  .route('/')
  .get(isAuthenticatedUser, getCart)
  .post(isAuthenticatedUser, createNewCart);

router.route('/:id').delete(deleteCart).patch(updateExisting);

module.exports = router;
