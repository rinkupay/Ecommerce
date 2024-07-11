import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import {fetchOrderDetails} from "../../features/orderDetailsSlice"
const OrderDetails = () => {

  const dispatch = useDispatch()
  const paramId = useParams();
  const {order,loading} = useSelector((state)=>state.orderDetails)
 
  console.log(order)

  useEffect(()=>{
dispatch(fetchOrderDetails(paramId))
  },[paramId])
  return (
    <div>
     {loading ? <Loader /> : <Fragment>{order && (<div className="order-details-container">
        <div className="order-details-feed">
          <h3>Delivery Address</h3>
          <h4>Rinku Murmu</h4>
          <h4>{order.order.shippingInfo.address}</h4>
          <h4>7488040620</h4>
        </div>

        <div className="order-details-feed">
          <div className="pro-details">
            <img
              className="order-details-image"
              src="https://www.pngkey.com/png/detail/29-296176_honor-9lite-honor-9-lite-png.png"
              alt="Sample image"
            />
            <div className="pro-name">
              <Link className="product-name" to={`/product/${order.order.orderItems[0]._id}`}> Honor 9 lite</Link>
              <h5 className="item-price">Item Price : ₹ {order.order.paymentInfo.totalPrice}</h5>
              <h5 className="item-price"> Tex Price : ₹ {order.order.paymentInfo.taxPrice}</h5>
              <h5 className="item-price"> Shipping Price : ₹ {order.order.paymentInfo.shippingPrice}</h5>
              <h5 className="item-price">Total Price : ₹ {order.order.paymentInfo.totalPrice}</h5>
            </div>
            <div className="order-status">
              <h3 className="product-name">Ordered at : {String(order.order.createdAt).substr(0,10)}</h3>
              <h4>Order Status : {order.order.orderStatus}</h4>
            </div>
          </div>
        </div>
      </div>)}</Fragment> }
    </div>
  );
};

export default OrderDetails;
