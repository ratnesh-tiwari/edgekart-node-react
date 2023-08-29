const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
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

// populating the order field with some values
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'cartItems',
    select: 'name images price ',
  });

  next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
