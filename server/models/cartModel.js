const mongoose = require('mongoose');
const { isEmpty } = require('../utils/helper');

const cartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: [true, 'A cart must have at least one element.'],
        },
        quantity: {
          type: Number,
          required: [true, 'A product must have at least one quantity.'],
          default: 1,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'A review must belong to a user.'],
      ref: 'User',
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

cartSchema.index({ user: 1 }, { unique: true });

// validator
cartSchema.path('cartItems').validate(isEmpty, 'Cart can not be empty.');

// populating the order field with some values
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'cartItems',
    populate: {
      path: 'product',
      select: 'name images price ',
    },
  });

  next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
