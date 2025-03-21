const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const { Error } = require("mongoose");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary").v2;




// <<<<<<<===================== Create Product --Admin =========================>>>>>>>>>>>>>>>
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, price, description, category } = req.body;

  // Validation
  if (!name || !price || !description || !category) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  // Ensure price is a positive number
  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ success: false, message: 'Price must be a positive number' });
  }

  // Create new product instance
  const product = new Product({
    name,
    price,
    description,
    category,
    user: req.user.id,
  });

  // Save product to database
  await product.save();

  // Send success response
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product: {
      _id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      user: product.user,
    },
  });
});




// Get all products

exports.getAllproducts = catchAsyncErrors(async(req,res,next) =>{
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);

  const products = await apiFeature.query;

 
  res.status(200).json({
    success:true,
    products,
    productCount,
    resultPerPage,
  })
})


// Get all products (ADMIN)

exports.adminGetAllproducts = catchAsyncErrors(async(req,res,next) =>{
  
  const products = await Product.find();

 
  res.status(200).json({
    success:true,
    products,
   
  })
})

//Pagination

exports.pagiNation = catchAsyncErrors(async (req, res, next) => {
  let page = req.body.page;
  let limit = 3;

  let skip = (page - 1) * limit;
  const product = await Product.find().skip(skip).limit(limit);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Search Product

exports.searchProduct = catchAsyncErrors(async (req, res, next) => {
  const search = req.body.search;
  const product = await Product.find({
    name: { $regex: ".*" + search + ".*", $options: "i" },
  });

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});


// Update Product --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
   

    // Find the product by ID
    let product = await Product.findById(req.params.id);

    // Check if the product exists
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Update the product with the new data
    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated product
        runValidators: true, // Validate the updated data
        useFindAndModify: false, // Avoid deprecated warning
      }
    );

    // Respond with success message and updated product
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
return res.status(500).json({
  success:false,
  error:`${error.message}`
})
  }
});

//Delete product --Admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
    product
  });
});


// Create new Review or Update the Review
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{

  const {rating,comment,productId} = req.body;
  console.log(req.body)
  const review = {
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment,
  }

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev)=> rev.user.toString()===req.user._id.toString());

  if(isReviewed){

    product.reviews.forEach((rev)=>{
      if(rev.user.toString()===req.user._id.toString()){
        (rev.rating= rating),(rev.comment = comment);
      }
    })
  }
  else{
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  //  Ratings for Products
  let avg = 0;
  product.reviews.forEach((rev)=>{
    avg += rev.rating;
  })
  product.ratings = avg / product.reviews.length;

  await product.save({validateBeforeSave:false});

  res.status(200).json({
    success:true,
    message: 'Reviewed Successfully',
    
  })
})


//  Get All Reviews of a Product

exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{

  const product = await Product.findById(req.query.id);
console.log(product)
  if(!product){
    return next(new ErrorHandler("Product not found",404))
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews,
    
  })
})


// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
