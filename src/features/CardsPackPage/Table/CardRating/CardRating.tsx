import * as React from "react";
import { memo } from "react";
import Rating from "@mui/material/Rating";

type CardRatingPropsType = {
  rating: number;
};

export const CardRating = memo((props: CardRatingPropsType) => {
  return (
    <Rating name="read-only" value={props.rating} precision={0.2} readOnly />
  );
});
