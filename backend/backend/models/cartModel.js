const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    itemId:{
        type: mongoose.Schema.ObjectId,
        ref:"Cart",
    },
    name:{
        type: String,
    },
    image:{
         type:String,
    },
    quantity:{
        type:Number,
    },
    price:{
        type:Number,
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
    },
    // createdAt:{
    //     type:Date,
    //     default:Date.now,
    // }

},{timestamps:true})

module.exports = mongoose.model("Cart",cartSchema)