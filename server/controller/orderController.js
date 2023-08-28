const Order = require('../models/orderModel');
const { getAll, getOne, createNew } = require('./factoryHandler');

exports.getAllOrders = getAll(Order);
exports.getOneOrder = getOne(Order);
exports.createAnOrder = createNew(Order);
