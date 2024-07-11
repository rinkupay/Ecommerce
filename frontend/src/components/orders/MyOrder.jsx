import React, { Fragment, useEffect } from 'react'
import "./MyOrder.css"
import OrderCard from "../orders/OrderCard"
import { fetchOrders } from '../../features/orderSlice'
import { useDispatch, useSelector } from "react-redux";
import Loader from '../Loader/Loader';
import { useNavigate } from "react-router-dom";
const MyOrder = () => {
  const navigate = useNavigate()  
  const dispatch = useDispatch()
  const {orders ,loading} = useSelector((state)=>state.orders)
  const {isLoggedIn} = useSelector((state)=>state.userRed)




useEffect(()=>{
  dispatch(fetchOrders())
if(isLoggedIn === false){
  navigate('/login')

}
 
},[isLoggedIn])


  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment > 
        
      <div className="order-container">
        <div className="order-container-1">
        <h2>My Orders</h2>
           <div className="order-list">
         {orders.map((order,index)=>(
            <OrderCard key={index} order={order} />
         ))}
           
       
           
           </div>
        </div>
      </div>
        </Fragment>}
    </Fragment>
  )
}

export default MyOrder
