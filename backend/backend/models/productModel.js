const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    
    name:String,
    
    description:{
        type:String,
        // required:[true,"Please Enter product Description"]
    },
    price:{
        type:Number,
        // required:[true,"Please Enter product Price"],
        maxLength:[8,"Price connot exceed * characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
        
            public_id:{
                type:String,
                // required:true
            },
            url:{
                type:String,
                required:true
            }
        }    
        
        ],
    category:{
        type:String,
        // required:[true,"Please Enter Product Category"],
    },
    stock:{
        type:String,
        // required:[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock cannot exceed 4 Digits"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            // User who created review
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
            name:{
                type:String,
                // required:true,
            },
            rating:{
                type:Number,
                // required:true,
            },
            comment:{
                type:String,
                // required:true,
            }
        }
    ],

    
    // User who created product
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },


    createdAt:{
        type:Date,
        default:Date.now
    }
     
    
})

module.exports = mongoose.model("Product",productSchema)