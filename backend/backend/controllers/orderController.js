const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    // itemsPrice,
    // taxPrice,
    // shippingPrice,
    // totalPrice,
  } = req.body;
  // console.log(shippingInfo,paymentInfo,orderItems)
  const order = await new Order({
    shippingInfo,
    orderItems,
    paymentInfo,
    // itemsPrice,
    // taxPrice,
    // shippingPrice,
    // totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  // console.log(order)
  await order.save({validateBeforeSave : false});
  res.status(201).json({
    success: true,
    order,
  });
});


// module.exports = newOrder

// get Single Order

exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{

  const order = await Order.findById(req.params.id)

  console.log(order)

  if(!order){
    res.status(404).json({
      success:false,
      message:`Order not foun with id: ${req.params.id}`
    })
  }
  res.status(200).json({
    success:true,
    order
  })

})

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  const orderCount = await Order.countDocuments();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
    orderCount,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }
  console.log(req.params.id)
  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
