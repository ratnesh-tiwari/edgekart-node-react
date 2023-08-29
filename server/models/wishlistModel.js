const mongoose = require('mongoose');

// Wishlist Schema
const wishlistSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// to populate wishlist field
wishlistSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
    select: 'name images price ratingAverage numOfReviews',
  });

  next();
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;
