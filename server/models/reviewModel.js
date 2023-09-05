const mongoose = require('mongoose');
const Product = require('./productModel');

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
    select: 'name avatar',
  });

  next();
});

// adding rating and numrating to Product page
reviewSchema.statics.calAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        numReview: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingAverage: stats[0].avgRating,
      numReviews: stats[0].numReview,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingAverage: 0,
      numReviews: 0,
    });
  }
};

// // running rating calclater on every review
reviewSchema.post('save', function () {
  // this point to curr review
  this.constructor.calAverageRatings(this.product);
});

// // running rating calclater on every review del and update
reviewSchema.pre(/^findOneAnd/, async function (next) {
  // for getting document
  this.r = await this.model.findOne();
  next();
});

// // saving the rating in post
reviewSchema.post(/^findOneAnd/, async function () {
  // passing review from pre middleware
  await this.r.constructor.calAverageRatings(this.r.product);
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
