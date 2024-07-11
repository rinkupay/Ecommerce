import React, { useState } from "react";
import "./OrderSummary.css";

const OrderSummary = () => {
  const [quantity, setQuantity] = useState(1);

  const decQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div>
      <div className="orderSummary-wrapper">
        <div className="order-summary-container">
          <div className="order-summary-left">
            <div className="order-subdiv">
              <div className="sub-order">
                <div className="sub-order-1">
                  <p className="logged-in-name">LOGIN</p>
                  <p className="addredd">Rinku</p>
                </div>
              </div>
            </div>
            <div className="order-subdiv">
              <div className="sub-order">
                <div className="sub-order-1">
                  <p className="logged-in-name">DELIVERY ADDRESS</p>
                  <p className="addredd">Kodo khicha dumka </p>
                </div>
                <button className="address-change">Change</button>
              </div>
            </div>
            {/* ORDER SUMMARY */}
            <div className="order-subdiv summary">
              <div className="order-summery-heading">
                <h3>ORDER SUMMARY</h3>
              </div>
              <div className="order-product-summary">
                <div className="order-product-details">
                  <img
                    className="product-summary-image"
                    src="https://www.pngkey.com/png/detail/29-296176_honor-9lite-honor-9-lite-png.png"
                    alt=""
                  />
                  <div className="product-details-order">
                    <p className="product-name">Honor 9 lite</p>
                    <p className="product-seller">Seller</p>
                    <h4 className="product-price">₹10000</h4>
                  </div>
                </div>
              </div>
              <div className="product-quantity">
                <button className="product-quantity-btn" onClick={decQuantity}>
                  -
                </button>
                <input
                  className="product-quantity-number"
                  value={quantity}
                  readOnly
                  type="number"
                />
                <button className="product-quantity-btn" onClick={incQuantity}>
                  +
                </button>
              </div>
            </div>

            <div className="order-subdiv">
              <div className="sub-order">
                <div className="sub-order-1">
                  <p className="addredd">Order confirmation</p>
                </div>
                <button className="order-confirmation-btn">CONTINUE</button>
              </div>
            </div>
          </div>

          <div className="order-summary-right">
            <div className="order-summary-right-1">
              <div className="order-summary-right-2">
                <p>PRICE DETAILS</p>
              </div>
            </div>
            <div className="order-summary-right-1">
              <div className="order-summary-right-2">
                <div className="order-price">
                  <p>Price ({quantity} item{quantity > 1 ? "s" : ""})</p>
                  <p>₹{10000 * quantity}</p>
                </div>
                <div className="order-price">
                  <p>Delivery Charges</p>
                  <p>₹40</p>
                </div>
                <div className="order-price">
                  <h3>Total Payable</h3>
                  <h3>₹{10000 * quantity + 40}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
