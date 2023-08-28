const Review = require('../models/reviewModel');
const {
  getAll,
  getOne,
  createNew,
  deleteOne,
  updateExisting,
} = require('./factoryHandler');

exports.getAllReview = getAll(Review);
exports.getOneReview = getOne(Review);
exports.createReview = createNew(Review);
exports.deleteReview = deleteOne(Review);
exports.updateReview = updateExisting(Review);
