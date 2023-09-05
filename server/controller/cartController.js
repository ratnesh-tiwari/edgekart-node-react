// importing product model
const Cart = require('../models/cartModel');

// importing factory function
const {
  createNew,

  deleteOne,
  getDocByUserId,
  updateWholeDoc,
} = require('./factoryHandler');

// CRUD using factory handler function
exports.getCart = getDocByUserId(Cart);
exports.createNewCart = createNew(Cart);
exports.updateExistingCart = updateWholeDoc(Cart);
exports.deleteCart = deleteOne(Cart);
