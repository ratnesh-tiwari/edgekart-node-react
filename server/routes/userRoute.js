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
const {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
} = require('../controller/userController');

const router = express.Router();

// authentication routes
router.route('/register').post(createNewUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logoutUser);
router.route('/update-password').post(isAuthenticatedUser, updatePassword);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:token').post(resetPassword);

// User related routes
router.route('/').get(getAllUsers);
router.route('/:id').get(getOneUser).delete(deleteUser).patch(updateUser);

module.exports = router;
