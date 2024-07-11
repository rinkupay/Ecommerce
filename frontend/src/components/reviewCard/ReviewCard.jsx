import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import ProfilePng from "../../images/profile.png";
import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 15,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className="reviewCard">
      <div className="ratings-contents-review">
        <Stack spacing={1}>
          <Rating
            name="simple-controlled"
            defaultValue={review.rating}
            precision={0.5}
            sx={{ color: "tomato" }}
            readOnly
            
          />
        </Stack>
        <span>{review.comment}</span>
      </div>
      <div className="ratings-contents-users">
        <img src={ProfilePng} alt="User" />
        <p>{review.name}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
