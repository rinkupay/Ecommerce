import React from "react";
import "./MyCartCard.css";

const MyCartCard = ({item ,deleteCartItem}) => {

  return (
    <div>
      <div className="cart-card-wrapper">
        <div className="cart-card-container">
          <img
            className="cart-card-image"
            src={item.image}
            alt=""
          />
          <div className="cart-card-details">
            <h3 className="cart-price">{item.name}</h3>
            <h4 className="cart-price">₹ {item.price}</h4>
            <h4 className="cart-price">Quantity: {item.quantity}</h4>

            <span className="cart-price stock">Out of stock</span>
            <div className="cart-action-btns">
              <button className="cart-action-btn">Save For Later</button>
              <button className="cart-action-btn" onClick={()=>deleteCartItem(item._id)}>Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCartCard;
