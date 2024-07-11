const express = require("express");
const router = express.Router();
const {
  getSingleOrder,
  deleteOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  newOrder
  
} = require("../controllers/orderController");



const {authorizedRole,isAuthenticatedUser} = require("../middleware/verifyUser")








  router.route("/order/new").post(isAuthenticatedUser, newOrder);

  router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
  
  router.route("/orders/me").get(isAuthenticatedUser, myOrders);
  
  router
    .route("/admin/orders")
    .get(isAuthenticatedUser, authorizedRole("admin"), getAllOrders);
  
  router
    .route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizedRole("admin"), updateOrder)
    

    router.route("/admin/order/:id").delete(isAuthenticatedUser,authorizedRole("admin"), deleteOrder);

module.exports = router