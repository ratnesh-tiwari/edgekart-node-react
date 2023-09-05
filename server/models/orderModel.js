const mongoose = require('mongoose');
const { isEmpty } = require('../utils/helper');
const User = require('../models/userModel');

const orderSchema = new mongoose.Schema(
  {
    address: {
      type: mongoose.Schema.ObjectId,
      ref: 'Address',
      required: true,
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
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    deliveryPartner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    paymentInfo: {
      paymentId: {
        type: Number,
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
      enum: ['placed', 'rejected', 'shipped', 'out-for-delivery', 'delivered'],
      default: 'placed',
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

// validator
orderSchema
  .path('orderItems')
  .validate(isEmpty, 'Order can not be made for empty product list.');

// populating the order field with some values
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'orderItems',
    populate: {
      path: 'product',
      select: 'name images price ',
    },
  });

  next();
});

// orderSchema.statics.assignDeliveryPartner = async (orderId) => {
//   const deliveryPartner = await User.find({ role: 'delivery-partner' });

// };

// orderSchema.pre(/^findOneAnd/, async function (next) {
//   // for getting document
//   this.o = await this.model.findOne();
//   next();
// });

// orderSchema.post(/^findOneAnd/, async function () {
//   // passing review from pre middleware
//   if (this.o.orderStatus === 'shipped' && !this.o.deliveryPartner)
//     await this.o.constructor.assignDeliveryPartner(this.o._id);
// });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
