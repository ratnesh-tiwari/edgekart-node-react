const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const { getAll, getOne, createNew } = require('./factoryHandler');

exports.getAllOrders = getAll(Order);
exports.getOneOrder = getOne(Order);
exports.createAnOrder = createNew(Order);

// aggregation function to know total order made till now and pending orders
exports.getOrderStats = catchAsync(async (req, res, next) => {
  // pending order stats
  const delivered = await Order.aggregate([
    {
      $match: { orderStatus: 'delivered' },
    },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: '$totalPrice' },
        totalTex: { $sum: '$texOnCart' },
        totalOrders: { $sum: 1 },
      },
    },
  ]);

  // runing order stats
  const running = await Order.aggregate([
    {
      $match: { orderStatus: { $ne: 'delivered' } },
    },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: '$totalPrice' },
        totalTex: { $sum: '$texOnCart' },
        totalOrders: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    stats: {
      status: 'sucess',
      delivered,
      running,
    },
  });
});

// aggregation function to get monthly order
exports.getMonthlyStats = catchAsync(async (req, res, next) => {
  // pending order stats
  const year = req.params.year * 1;
  const plan = await Order.aggregate([
    {
      $unwind: '$createAt',
    },
    {
      $match: {
        createAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$createAt' },
        totalPrice: { $sum: '$totalPrice' },
        totalTex: { $sum: '$texOnCart' },
        totalOrders: { $sum: 1 },
      },
    },
    {
      // used to rename a field
      $addFields: {
        month: '$_id',
      },
    },
    {
      // use to remove a field
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { totalOrders: -1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    stats: {
      status: 'success',
      stats: plan,
    },
  });
});
