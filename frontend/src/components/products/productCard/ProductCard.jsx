import React from "react";
import "./ProductCard.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const ProductCard = ({product}) => {
  return (
    <div className="product_card">
      <div className="product-card-1">
        <Link className="productCard-wrapper" to={`/product/${product._id}`}>
       {product.images.map((pic,index)=>(
           <img
           className="product-image"
           src={pic.url}
           alt={product.name}
           key={index}
         />
       ))}
          <div className="product-details-2">
            <h3 className="product-card-name">{product.name}</h3>
            <div className="ratings-card">
              <Stack spacing={1}>
                <Rating
                  name="half-rating"
                  defaultValue={2.5}
                  precision={0.5}
                  readOnly
                  sx={{ color: "tomato" }}
                />
              </Stack>
              <p className="card-reviews"> ({product.numOfReviews})</p>
            </div>
            <p className="product-card-price">{product.price}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
