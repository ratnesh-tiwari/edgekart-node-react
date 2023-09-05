const express = require('express');

const {
  isAuthenticatedUser,
  authorizedRoles,
} = require('../controller/authContorller');
const {
  createNewAddress,
  getOneAddress,
  deleteAddress,
  updateExistingAddress,
  getAllDocRelatedToUser,
} = require('../controller/addressController');

const router = express.Router();

// adding authentication so this route can be access by logged in users only
router.use(isAuthenticatedUser, authorizedRoles('user'));

router.route('/').get(getAllDocRelatedToUser).post(createNewAddress);
router
  .route('/:id')
  .get(getOneAddress)
  .delete(deleteAddress)
  .patch(updateExistingAddress);

module.exports = router;
