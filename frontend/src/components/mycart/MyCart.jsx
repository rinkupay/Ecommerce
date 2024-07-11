import React, { useEffect } from 'react';
import './MyCart.css';
import MyCartCard from './MyCartCard';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart, removeCartItem } from "../../features/cartSlice";
import { toast } from 'react-toastify'; // Import toast
import Loader from "../Loader/Loader"

const MyCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteCartItem = (id) => {
    dispatch(removeCartItem(id)).then((action) => {
      if (action.type === removeCartItem.fulfilled.type) {
        toast.success("Item removed from cart successfully!");
        dispatch(fetchCart()); // Fetch the cart items after item is deleted
      } else {
        toast.error("Failed to remove item from cart.");
      }
    });
  }

  const { cart,loading } = useSelector((state) => state.cart);
  const cartItems = cart?.cart;

  const { isLoggedIn } = useSelector((state) => state.userRed);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      dispatch(fetchCart()); // Fetch the cart items when the component mounts
    }
  }, [isLoggedIn, navigate, dispatch]);

  // Calculate total price, discount, delivery charges, and total amount
  const totalPrice = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const discount = 0; // Assuming discount logic will be added here
  const deliveryCharges = totalPrice > 0 ? 30 : 0; // Example logic for delivery charges
  const packagingFee = totalPrice > 0 ? 49 : 0; // Example logic for packaging fee
  const totalAmount = totalPrice - discount + deliveryCharges + packagingFee;

  return (
    <div>
     {loading ? <Loader /> :  <div className="mycart-wrapper">
        <div className="mycart-container">
          <div className="mycart-left">
            <div className="left-cart-menu">
              <p>From Saved Addresses</p>
              <button className='pin-code-btn'>Enter Delivery pincode</button>
            </div>

            <div className="left-cart-menu">
              {cartItems && cartItems.map((item, index) => (
                <MyCartCard deleteCartItem={deleteCartItem} item={item} key={index} />
              ))}

              <div className="order-place-btn">
                <button className='order-btn'>Place Order</button>
              </div>
            </div>
          </div>

          <div className="mycart-right">
            <div className="cart-right-contents">
              <div className="cart-content">
                <h4 className='right-cart-heading'>PRICE DETAILS</h4>
              </div>
              <div className="cart-content">
                <div className="price-cart-items">
                  <p>Price ({cartItems?.length || 0} Items)</p>
                  <p>₹ {totalPrice}</p>
                </div>
                <div className="price-cart-items">
                  <p>Discount</p>
                  <p>₹ {discount}</p>
                </div>
                <div className="price-cart-items">
                  <p>Delivery Charges</p>
                  <p>₹ {deliveryCharges}</p>
                </div>
                <div className="price-cart-items">
                  <p>Secured Packaging Fee</p>
                  <p>₹ {packagingFee}</p>
                </div>
                <div className="price-cart-items total-amount">
                  <p>Total Amount</p>
                  <p>₹ {totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default MyCart;
