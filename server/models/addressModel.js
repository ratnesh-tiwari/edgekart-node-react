const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
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
      minlength: 6,
      minlength: 6,
    },
    phoneNo: {
      type: Number,
      required: true,
      minlength: 10,
      minlength: 10,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
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

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
