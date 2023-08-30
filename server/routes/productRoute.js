const express = require('express');

// importing controller functions
const {
  getAllProducts,
  createNewProduct,
  getOneProducts,
  deleteProduct,
  updateExistingProduct,
  homeProducts,
} = require('../controller/productController');
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require('../controller/authContorller');

const router = express.Router();

router.route('/home').get(homeProducts);

router
  .route('/')
  .get(getAllProducts)
  .post(isAuthenticatedUser, authorizedRoles('seller'), createNewProduct);

router
  .route('/:id')
  .get(getOneProducts)
  .delete(
    isAuthenticatedUser,
    authorizedRoles('seller', 'admin'),
    deleteProduct
  )
  .patch(isAuthenticatedUser, authorizedRoles('seller'), updateExistingProduct);

module.exports = router;
