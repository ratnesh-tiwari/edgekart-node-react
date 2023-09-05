const express = require('express');

const { isAuthenticatedUser } = require('../controller/authContorller');
const {
  getCart,
  createNewCart,
  deleteCart,
  updateExistingCart,
} = require('../controller/cartController');

const router = express.Router();

// adding authentication so this route can be access by logged in users only
router.use(isAuthenticatedUser);

router.route('/').get(getCart).post(createNewCart);

router.route('/:id').delete(deleteCart).put(updateExistingCart);

module.exports = router;
