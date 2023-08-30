const express = require('express');
const {
  createNewUser,
  loginUser,
  logoutUser,
  updatePassword,
  isAuthenticatedUser,
  forgotPassword,
  resetPassword,
  authorizedRoles,
} = require('../controller/authContorller');
const {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  updateRole,
  getUserDetails,
} = require('../controller/userController');

const router = express.Router();

// authentication routes
router.route('/register').post(createNewUser);
router.route('/login').post(loginUser);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:token').post(resetPassword);

// adding authentication so this route can be access by logged in users only
router.use(isAuthenticatedUser);

router.route('/me').get(getUserDetails);

router.route('/logout').get(isAuthenticatedUser, logoutUser);
router.route('/update-password').post(isAuthenticatedUser, updatePassword);

// User related routes
router.route('/').get(authorizedRoles('admin'), getAllUsers);
router.route('/:id').get(getOneUser).delete(deleteUser).patch(updateUser);

router
  .route('/role/:id')
  .patch(isAuthenticatedUser, authorizedRoles('admim'), updateRole);

module.exports = router;
