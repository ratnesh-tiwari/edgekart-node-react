// importing product model
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');

// importing factory function
const {
  getAll,
  getOne,
  createNew,
  updateExisting,
  deleteOne,
} = require('./factoryHandler');

// CRUD using factory handler function
exports.getAllProducts = getAll(Product);
exports.getOneProducts = getOne(Product, 'reviews');
exports.createNewProduct = createNew(Product);
exports.updateExistingProduct = updateExisting(Product);
exports.deleteProduct = deleteOne(Product);

exports.homeProducts = catchAsync(async (req, res, next) => {
  const data = await Product.aggregate([
    {
      $sort: { ratingAverage: -1 }, // Sort by rating in descending order
    },
    {
      $group: {
        _id: '$category', // Group by category
        documents: { $push: '$$ROOT' }, // Store the documents in an array
      },
    },
    {
      $project: {
        _id: 0,
        category: '$_id', // Restore the category field
        products: { $slice: ['$documents', 10] }, // Get the top 10 documents
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  });
});
