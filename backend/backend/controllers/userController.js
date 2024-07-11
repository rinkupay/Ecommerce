const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
    
    // Upload image to Cloudinary
    const myCloud = await cloudinary.uploader.upload(req.body.image, {
      folder: "avatars",
      transformation: [
        { width: 250, height: 250, gravity: "faces", crop: "thumb" },
        { radius: "max" },
      ],
    });

    // Delete the file uploaded by Multer
    // fs.unlinkSync(req.file.path);

    // Create a new user with the uploaded image details
    const { name, email, password } = req.body;
    const formattedMobile = "+91";
    const defaultGender = "male";

    const user = new User({
      name,
      email,
      mobile: formattedMobile,
      gender: defaultGender,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    // Check if email is already registered
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // Save the user to the database
    await user.save();

    res
      .status(201)
      .json({
        success: true,
        message: "User Registered Successfully. Please Login.",
      });
      // sendToken(user, 200, res);
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to register user" });
  }
});

// <===================================LOGIN USER =============================================>

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password); // Added semi-colon to end of statement

  // Checking if user has provided both email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  try {
    const isPasswordValid = await bcrypt.compare(password, user.password); // Changed req.body.password to password
    if (isPasswordValid) {
      sendToken(user, 200, res);
    } else {
      res
        .status(401)
        .json({ success: false, message: "Wrong email or password" }); // Changed status code to 401 for unauthorized
    }
  } catch (error) {
    res.status(500).send();
  }
});

// Logout user

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get Reset Password token

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

  const message = `Your password reset token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this eamil then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Password reset link sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password using reset link
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Creating Token Hash
  const resetPasswordToken = crypto
    .createHash("sha256")

    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user Password
exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  const user = await User.findById(req.user.id).select("+password");

  await bcrypt.compare(
    currentPassword,
    user.password,
    async function (error, result) {
      if (result) {
        user.password = newPassword;

        await user.save();
        sendToken(user, 200, res);
      } else {
        res.status(400).json({
          success: true,
          message: "Password did not matched",
        });
      }
    }
  );
});

// User Profile Update
exports.userProfileUpdate = catchAsyncErrors(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    mobile: req.body.mobile,
  };

  //We will add cloudnary later

  const user = await User.findByIdAndUpdate(req.user.id, userData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated",
    user,
  });
});

// <=============================== UPDATE USER PROFILE PICTURE ==========================>
// <=============================== UPDATE USER PROFILE PICTURE ==========================>
exports.userProfilePictureUpdate = async (req, res, next) => {
 try {
console.log("Hi Multer")
  
 } catch (error) {
  
 }
};




//Get All Users (admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const userCount = await User.countDocuments();
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
    userCount,
  });
});

//Get Single User (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400).json({
      success: true,
      message: `User does not exist with Id: ${req.params.id}`,
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// UPDATE USER ROLE  (admin)

exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  //We will add cloudnary later

  await User.findByIdAndUpdate(req.params.id, userData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: `User Role changed from ${req.user.role} to: ${req.body.role}`,
  });
});

// DELETE USER (ADMIN)

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
