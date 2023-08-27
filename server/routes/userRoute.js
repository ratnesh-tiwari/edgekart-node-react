const express = require('express');
const {
  createNewUser,
  loginUser,
  logoutUser,
  updatePassword,
  isAuthenticatedUser,
} = require('../controller/authContorller');

const router = express.Router();

router.route('/register').post(createNewUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logoutUser);
router.route('/update_password').get(isAuthenticatedUser, updatePassword);

module.exports = router;
