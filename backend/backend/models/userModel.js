const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
    validator: [validator.isEmail, "Please Enter a Valid Email"],
  },
  mobile:{
    type:Number,
    
  },
  gender:{
    type:String,
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      // required:true
    },
    url: {
      type: String,
      // required:true
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){

  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hasing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;

}



module.exports = mongoose.model("user", userSchema);
