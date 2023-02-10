import React from "react";
import { animated } from "react-spring";

interface Props {
  rating: number;
  onClick: (rating: number) => void;
  text: string;
  animation: any;
}

const RatingButton: React.FC<Props> = ({
  rating,
  onClick,
  text,
  animation,
}) => {
  const styleToRating = (rating: number) => {
    switch (rating) {
      case 1:
        return "bg-red-600";
      case 2:
        return "bg-yellow-400";
      case 3:
        return "bg-lime-400";
    }
  };
  return (
    <animated.button
      className={
        styleToRating(rating) +
        " px-3 py-1 rounded text-black border-black border-2"
      }
      style={animation}
      onClick={() => onClick(rating)}
    >
      {text}
    </animated.button>
  );
};

export default RatingButton;
