const Wishlist = require('../models/wishlistModel');
const { deleteOne, createNew, getDocByUserId } = require('./factoryHandler');

exports.deleteWishlist = deleteOne(Wishlist);
exports.createNewWishlist = createNew(Wishlist);
exports.getAllWishlist = getDocByUserId(Wishlist);
