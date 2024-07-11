import React, { useState, useEffect, Fragment } from "react";
import "./ProductDetails.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../../features/productDetailsSlice";
import Loader from "../../Loader/Loader";
import axios from "axios";
import ReviewCard from "../../reviewCard/ReviewCard";
import {toast ,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { updateReview } from "../../../features/reviewSlice";
import {addCart ,clearMessage} from "../../../features/cartSlice"

const ProductDetails = () => {
  const { id } = useParams(); // Access the 'id' parameter correctly

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing product details from Redux store
  const { products, error } = useSelector(
    (state) => state.productDetails
  );

  // Safely accessing product details
  let product = products?.product;


  // <<< ======================== User From State ========================>>>
  const {isLoggedIn} = useSelector((state)=>state.userRed)

  // <<< ======================== Review message from  State ========================>>>
  // const {message} = useSelector((state)=>state.review)

    // <<< ======================== Review message from  State ========================>>>
    const {message} = useSelector((state)=>state.cart)


  // States for review functionality
  const [review, setReview] = useState(false);
  const [value, setValue] = useState(0); // Initialize value state with a default value
  const [comment, setComment] = useState("");
  const data = {
    productId:id,
    rating: value,
    comment: comment,
  };
 

  // <<======================== Handle Product Quantity =========================>>
  const [quantity , setQuantity] = useState(1);
  const handleQuantityDecrement = ()=>{
    if (quantity === 1) {
      return quantity;
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrement = ()=>{
    if(product.stock == quantity){
      return;
    }else{
      setQuantity(quantity + 1)
    }
  }
  


  // << ================================== ADD TO CART FUNCTION ==================================>>
  const [cartData, setCartData] = useState({
    itemId:'',
    name: "",
    image: "",
    quantity: quantity,
    price: 0,
  });

  useEffect(() => {
    if (product) {
      setCartData({
        itemId:`${id}`,
        name: product.name,
        image: product.images[0].url,
        quantity: quantity,
        price: product.price,
      });
    }
  }, [product, quantity]);






  const addToCart =  () => {


    const response = dispatch(addCart(cartData))
   
  }


  
  // <<<<<<<<<==========   ORDER NOW =================>>>>>>>>>>>>
   const orderNow = (e)=>{
     e.preventDefault();



   }
  
   
  // Toast Notification

  // Function to submit review
  const submitReview = async () => {

if(isLoggedIn){
  dispatch(updateReview(data))
  setReview(false)
}else{
  navigate("/login")
}
   

  
  };

  // Fetch product details on component mount
  useEffect(() => {
    dispatch(fetchProductDetails(id));
    if(message){
      toast.success(message)
      dispatch(clearMessage())
     
    }
  }, [dispatch, id,message]);



  return (
    <Fragment>
      <ToastContainer />
      {product && (
        <div className="product-details-wrapper">
          {/* Review popup */}
          {review && (
            <div className="review-popup">
              <div className="review-container">
                <Stack spacing={1}>
                  <Rating
                    name="simple-controlled"
                    defaultValue={0}
                    precision={0.5}
                    sx={{ color: "tomato" }}
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Stack>
                <textarea
                  className="text-area"
                  placeholder="Review.."
                  cols="30"
                  rows="5"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                ></textarea>
                <div className="submit-review-container">
                  <button className="submit-review" onClick={submitReview}>
                    Submit
                  </button>
                  <button
                    className="submit-review"
                    onClick={() => setReview(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product details */}
          <div className="product-details-container">
            <div className="product-contents">
              <div className="product-images">
                <img src={product.images && product.images[0]?.url} alt="" />
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product._id}</p>
                <span></span>
                <div className="product-ratings">
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating"
                      defaultValue={product.ratings}
                      precision={0.5}
                      readOnly
                      sx={{ color: "tomato" }}
                    />
                  </Stack>
                  <p className="reviews">Review : ({product.numOfReviews})</p>
                </div>
                <h3 className="product-price">{product.price}</h3>
                <div className="product-quantity">
                  <div className="btn-coll">
                    <button className="quantity-btn"onClick={handleQuantityDecrement}>-</button>
                    <input
                      className="quantity-value"
                      value={quantity}
                      type="number"
                      readOnly
                    />
                    <button className="quantity-btn" onClick={handleQuantityIncrement} >+</button>
                  </div>
                  <button className="add-to-cart" onClick={addToCart}>Add to cart</button>
                  <button className="add-to-cart" onClick={orderNow}>Buy</button>
                </div>
                <p className="stock">
                  {product.stock >= 1 ? "In Stock" : "Out of stock"}
                </p>
                <p className="description">Description:</p>
                <p className="description-contents">{product.description}</p>
                <button
                  className="submit-reviews"
                  onClick={() => setReview(!review)}
                >
                  Review
                </button>
              </div>
            </div>
            {/* Reviews */}
            <div className="review-container-bottom">
              <h3>Reviews</h3>
              <div className="review-container-review">
                <div className="review-cards">
                  {/* Rendering review cards */}
                  {product.reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
