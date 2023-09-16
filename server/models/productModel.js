const mongoose = require('mongoose');

// defiening product schema
const productSchema = new mongoose.Schema(
  {
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
    discount: {
      type: Number,
      validate: {
        validator: function (val) {
          // This will only work while creating doc
          return val < this.price;
        },
        message: 'Discount price should be below regular price',
      },
    },
    ratingAverage: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    images: [
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
    brand: String,
    stock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      maxLength: [4, 'Stock cannot exceed 9999.'],
      default: 1,
    },
    gender: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtually populating the review to products
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

// creating model out of schema
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
