const express = require("express");
const multer = require('multer');
const { registerUser, loginUser, logout, getUserDetails,updateUserPassword,
     userProfileUpdate, getAllUsers, getSingleUser, deleteUser, updateUserRole, 
     userProfilePictureUpdate} = require("../controllers/userController");
const router = express.Router();
const { forgotPassword,resetPassword } = require("../controllers/userController");

const {authorizedRole, isAuthenticatedUser} = require("../middleware/verifyUser")






// <======================== MULTER CONFIGURATION =============================>
// Multer configuration
// Multer configuration
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname); // You can customize the filename as needed
  },
});
const upload = multer({ storage: storage });
    //  upload.single('image')


// ROUTES STARTS HERE
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logout);

router.route("/me").get(isAuthenticatedUser,getUserDetails);

router.route("/profile/update").put(isAuthenticatedUser,userProfileUpdate);

router.route("/profile/pic/update").put(isAuthenticatedUser, upload.single('image'), userProfilePictureUpdate);



router.route("/password/update").put(isAuthenticatedUser,updateUserPassword);

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:token").put(resetPassword)

router.route("/admin/users").get(isAuthenticatedUser,authorizedRole("admin"), getAllUsers);//Admin Route

router.route("/admin/user/:id").get(isAuthenticatedUser,authorizedRole("admin"),getSingleUser)
                         .delete(isAuthenticatedUser,authorizedRole("admin"),deleteUser)
                         .put(isAuthenticatedUser,authorizedRole("admin"),updateUserRole);// Admin route




module.exports = router