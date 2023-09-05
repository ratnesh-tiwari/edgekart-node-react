// importing product model
const Address = require('../models/addressModel');

// importing factory function
const {
  getAll,
  getOne,
  createNew,
  updateExisting,
  deleteOne,
  getDocByUserId,
} = require('./factoryHandler');

// CRUD using factory handler function
exports.getAllDocRelatedToUser = getDocByUserId(Address);
exports.getOneAddress = getOne(Address);
exports.createNewAddress = createNew(Address);
exports.updateExistingAddress = updateExisting(Address);
exports.deleteAddress = deleteOne(Address);
