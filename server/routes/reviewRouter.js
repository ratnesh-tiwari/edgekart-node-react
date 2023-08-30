const express = require('express');
const {
  getAllReview,
  createReview,
  getOneReview,
  updateReview,
  deleteReview,
} = require('../controller/reviewController');
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require('../controller/authContorller');

const router = express.Router();

router.use(isAuthenticatedUser);

router
  .route('/')
  .get(authorizedRoles('admin'), getAllReview)
  .post(isAuthenticatedUser, createReview);

router.route('/:id').get(getOneReview).patch(updateReview).delete(deleteReview);

module.exports = router;
