import React from "react";
import classes from "./TourButton.module.css";
const TourButton = ({ onClick, color, children, size, style }) => {
  const btnClasses = `${classes.btn} ${
    color === "green" ? classes["btn--green"] : classes["btn--white"]
  } ${size && classes["btn--lg"]}`;
  return (
    <button className={btnClasses} onClick={onClick} style={{ ...style }}>
      {children}
    </button>
  );
};

export default TourButton;
