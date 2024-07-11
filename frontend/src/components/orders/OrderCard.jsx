import React from 'react'
import "./OrderCard.css"
import { Link } from "react-router-dom";
const OrderCard = ({order}) => {

  // const{orderItems} = order
  // console.log(order)
  return (
    <div>
     <Link className='order-cards' to={`/myorders/${order._id}`}>
     <div className="order-card">
        <div className="order-img-name">
        <img className='order-card-img' src="https://www.pngkey.com/png/detail/29-296176_honor-9lite-honor-9-lite-png.png" alt="" />
        <p className='pro-name'>{order.orderItems[0].name}</p>
        </div>
        <p>₹ {order.paymentInfo.itemsPrice}</p>
        <div className="delivery-status">
            <p>Ordered at: {String(order.createdAt).substr(0,10)}</p>
            <p>Status : {order.orderStatus}</p>
        </div>

      </div></Link>
    </div>
  )
}

export default OrderCard
