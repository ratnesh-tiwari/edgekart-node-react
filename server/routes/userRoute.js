const express = require('express');
const {
  createNewUser,
  loginUser,
  logoutUser,
  updatePassword,
  isAuthenticatedUser,
  forgotPassword,
  resetPassword,
} = require('../controller/authContorller');

const router = express.Router();

router.route('/register').post(createNewUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logoutUser);
router.route('/update_password').post(isAuthenticatedUser, updatePassword);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:token').post(resetPassword);

module.exports = router;
