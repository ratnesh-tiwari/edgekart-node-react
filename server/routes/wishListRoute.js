const express = require('express');

const {
  isAuthenticatedUser,
  authorizedRoles,
} = require('../controller/authContorller');
const {
  deleteWishlist,
  createNewWishlist,
  getAllWishlist,
} = require('../controller/wishlistControllre');

const router = express.Router();

// adding authentication so this route can be access by logged in users only
router.use(isAuthenticatedUser, authorizedRoles('user'));

router
  .route('/')
  .get(isAuthenticatedUser, getAllWishlist)
  .post(isAuthenticatedUser, createNewWishlist);
router.route('/:id').delete(deleteWishlist);

module.exports = router;
