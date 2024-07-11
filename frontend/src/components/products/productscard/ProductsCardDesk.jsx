import React from "react";
import "./ProductsCardDesk.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const ProductsCardDesk = ({ product }) => {
  return (
    <div>
      <Link
        to={`/product/${product._id}`}
        className="products-wrapper-container"
      >
        <div className="products-container-contents">
          <div className="prod-img">
            {product.images.map((pic, index) => (
              <img
                className="image-produ"
                src={pic.url}
                alt={product.name}
                key={index}
              />
            ))}
          </div>
          <div className="products-details">
            <h3 className="prod-name">{product.name}</h3>
            <p className="pro-id">{product._id}</p>
            <div className="ratings-pro">
              <Stack spacing={1}>
                <Rating
                  name="half-rating"
                  defaultValue={product.ratings}
                  precision={0.5}
                  readOnly
                  sx={{ color: "tomato" }}
                />
              </Stack>
            </div>
          </div>
          <div className="price-details">
            <h3 className="prod-price"> ₹{product.price}</h3>
            <div className="original-price">
              <del className="price">₹{product.price}</del>
              <p className="discount">7 % off</p>
            </div>
            <p className="free-delivery">Free Delivery</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductsCardDesk;
