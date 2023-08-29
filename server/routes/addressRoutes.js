const express = require('express');

const { isAuthenticatedUser } = require('../controller/authContorller');
const {
  getAllAddress,
  createNewAddress,
  getOneAddress,
  deleteAddress,
  updateExistingAddress,
} = require('../controller/addressController');

const router = express.Router();

router
  .route('/')
  .get(getAllAddress)
  .post(isAuthenticatedUser, createNewAddress);
router
  .route('/:id')
  .get(getOneAddress)
  .delete(deleteAddress)
  .patch(updateExistingAddress);

module.exports = router;
