import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import { productDetailsReducer } from "./features/productSlice";
import userRegisterSlice from "./features/registerSlice";
import userReducer from "./features/userReducer";
import orderSlice from "./features/orderSlice";
import  fetchOrderDetailsSlice  from "./features/orderDetailsSlice";
import reviewSlice from "./features/reviewSlice";
import adminProductSlice from './features/adminProducts'
import cartSlice from "./features/cartSlice";
import passwordResetSlice from "./features/passwordResetSlice";
import adminUserSlice from "./features/adminSlice"
import adminUserOrderSlice from "./features/adminOrders"



const store = configureStore({
  reducer: {
    products: productSlice,
    productDetails: productDetailsReducer,
    registerUser:userRegisterSlice,
    userRed: userReducer,
    orders : orderSlice,
    orderDetails:fetchOrderDetailsSlice,
    review:reviewSlice,
    adminProducts:adminProductSlice,
    cart:cartSlice,
    passwordReset:passwordResetSlice,
    user:adminUserSlice,
    allOrders:adminUserOrderSlice,
   
  },
});

export default store;
