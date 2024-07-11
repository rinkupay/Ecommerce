const express = require('express');
const router = express.Router();
const { addToCart ,getCartProduct, removeCartItem} =require('../controllers/cartController');
const {authorizedRole,isAuthenticatedUser} = require("../middleware/verifyUser")

router.route("/cart").post(isAuthenticatedUser,addToCart);
router.route("/mycart").get(isAuthenticatedUser,getCartProduct);
router.route("/mycart/:id").delete(isAuthenticatedUser,removeCartItem);


module.exports = router