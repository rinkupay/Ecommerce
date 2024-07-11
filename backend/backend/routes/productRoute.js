const express = require("express");
const multer = require('multer');
const { getAllproducts,createProduct, updateProduct, deleteProduct, getProductDetails,
        searchProduct, pagiNation, createProductReview, getProductReviews, deleteReview, 
        adminGetAllproducts} = require("../controllers/productController");
const {isAuthenticatedUser, authorizedRole} = require("../middleware/verifyUser")

const router = express.Router();

// MUlTER CONFIGURATION
// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save uploaded files to the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename uploaded files with a unique name
  },
});

// Create multer instance with storage configuration
const upload = multer({ storage: storage });




router.route("/products").get(getAllproducts)
router.route("/admin/products").get(isAuthenticatedUser,authorizedRole("admin"),adminGetAllproducts)  // Admin get all products

router.route("/reviews").get(getProductReviews)
                                .delete(isAuthenticatedUser,deleteReview); //Get All reviews of a Product and can  delete a review

// router.route("/product/review/delete").get(deleteReview) //Delete Review of a product

router.route("/admin/product/new").post(isAuthenticatedUser,authorizedRole("admin"),createProduct);

router.route("/product/:id").put(isAuthenticatedUser,authorizedRole("admin"),updateProduct)
                            .delete(isAuthenticatedUser,authorizedRole("admin"),deleteProduct)
                            .get(getProductDetails)
                           
router.route("/review").put(isAuthenticatedUser,createProductReview)     // create Product review                        

router.route("/products/search").get(searchProduct)



router.route("/products/pagination").get(pagiNation);







module.exports = router


