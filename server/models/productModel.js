const mongoose = require('mongoose');

// defiening product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a valid name.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please enter product description.'],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price.'],
    maxLength: [8, 'Price cannot exceed more then 8 length.'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please enter product category.'],
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    maxLength: [4, 'Stock cannot exceed 9999.'],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a author.'],
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// creating model out of schema
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
