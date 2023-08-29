// importing product model
const Cart = require('../models/cartModel');

// importing factory function
const {
  createNew,
  updateExisting,
  deleteOne,
  getDocByUserId,
} = require('./factoryHandler');

// CRUD using factory handler function
exports.getCart = getDocByUserId(Cart);
exports.createNewCart = createNew(Cart);
exports.updateExistingCart = updateExisting(Cart);
exports.deleteCart = deleteOne(Cart);
