// importing product model
const Product = require('../models/productModel');

// importing factory function
const {
  getAll,
  getOne,
  createNew,
  updateExisting,
  deleteOne,
} = require('./factoryHandler');

// CRUD using factory handler function
exports.getAllProducts = getAll(Product);
exports.getOneProducts = getOne(Product, 'reviews');
exports.createNewProduct = createNew(Product);
exports.updateExistingProduct = updateExisting(Product);
exports.deleteProduct = deleteOne(Product);
