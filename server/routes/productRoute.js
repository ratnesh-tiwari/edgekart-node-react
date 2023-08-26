const express = require('express');

// importing controller functions
const {
  getAllProducts,
  createNewProduct,
  getOneProducts,
  deleteProduct,
  updateExistingProduct,
} = require('../controller/productController');

const router = express.Router();

router.route('/').get(getAllProducts).post(createNewProduct);

router
  .route('/:id')
  .get(getOneProducts)
  .delete(deleteProduct)
  .patch(updateExistingProduct);

module.exports = router;
