const express = require('express');

const { isAuthenticatedUser } = require('../controller/authContorller');
const {
  deleteWishlist,
  createNewWishlist,
  getAllWishlist,
} = require('../controller/wishlistControllre');

const router = express.Router();

router
  .route('/')
  .get(isAuthenticatedUser, getAllWishlist)
  .post(isAuthenticatedUser, createNewWishlist);
router.route('/:id').delete(deleteWishlist);

module.exports = router;
