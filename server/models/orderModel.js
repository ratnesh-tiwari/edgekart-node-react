const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
      phoneNo: {
        type: Number,
        required: true,
      },
    },
    orderItems: [
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
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    paymentInfo: {
      id: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      paidAt: {
        type: Date,
        required: true,
      },
    },
    totalCartItemPrice: {
      type: Number,
      required: true,
    },
    texOnCart: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    deliveredAt: String,
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
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
    select: 'name images price ',
  });

  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
