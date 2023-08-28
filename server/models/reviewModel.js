const mongoose = require('mongoose');

// review schema
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty.'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating can not be empty.'],
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    }, // referencing
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'A review must belong to a user.'],
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'A review must belong to a product.'],
      ref: 'Product',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// to populate review field
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name avatar ',
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
