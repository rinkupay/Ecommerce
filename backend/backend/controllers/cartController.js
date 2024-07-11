const Cart = require('../models/cartModel');
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// <<======================= ADD TO CART ======================>

// <<======================= ADD TO CART ======================>
    exports.addToCart = catchAsyncErrors(async (req, res, next) => {
        const { name, image, price, quantity, itemId } = req.body;
 
        // Find the cart item for the current user and item ID
        const existingCartItem = await Cart.findOne({ user: req.user.id, itemId: itemId });
     
        if (existingCartItem) {
            // If the item already exists in the cart, update its quantity
            existingCartItem.quantity += quantity;
            await existingCartItem.save({ validateBeforeSave: false });
            
            res.status(200).json({
                success: true,
                message: "Product quantity updated in cart",
            });
        } else {
            // If the item doesn't exist in the cart, create a new cart item
            const cart = await new Cart({
                name: name,
                image: image,
                price: price,
                quantity: quantity,
                user: req.user._id,
                itemId: itemId,
            });
    
            await cart.save({ validateBeforeSave: false });
    
            res.status(200).json({
                success: true,
                message: "Product added to cart",
            });
        }
    });
    


// exports.addToCart = catchAsyncErrors(async(req,res,next)=>{

//     const {name,image,price, quantity,itemId} = req.body;


   

//     const cart = await new Cart({
//         name:name,
//         image:image,
//         price:price,
//         quantity:quantity,
//         user:req.user._id,
        
//     })

//     await cart.save({
//         validateBeforeSave:false
//     })

//     res.status(200).json({
//         success:true,
//         message:"Product added to cart",
       
       
//     })
// }) 


// <<<==================== GET ALL CART PRODUCT =====================>>>>>>>>>
exports.getCartProduct = catchAsyncErrors(async(req,res,next)=>{
  
    let cartCount = await  Cart.countDocuments();
    const cart =  await Cart.find({user:req.user.id});

    res.status(200).json({
        success:true,
        cart,
        cartCount,
    })
})


// <<<==================== DELETE CART PRODUCT =====================>>>>>>>>>
exports.removeCartItem = catchAsyncErrors(async(req,res,next)=>{

    const cartId = req.params.id;

    const item = await Cart.findByIdAndDelete(cartId);

    res.status(200).json({
        success:true,
        message:"Item deleted from cart"
    })

})