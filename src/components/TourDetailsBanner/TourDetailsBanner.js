import React from "react";
import classes from "./TourDetailsBanner.module.css";
import Spinner from "../Spinner/Spinner";
const TourDetailsBanner = ({ tour }) => {

  //Split tour name
  const nameArray = tour.name;
  const image = tour.imageCover?.startsWith("tour-")
    ? `url('../tours/${tour.imageCover}')`
    : `url('${tour.imageCover}')`;

  //Show spinner when tour is not loaded
  if (!tour.name) {
    return <Spinner />;
  }
  return (
    <section className={classes.tourBanner} style={{ backgroundImage: image }}>
      <div className="heading-box">
        <h1 className={classes["heading-tertirary"]}>
          <span>
            {nameArray}
          </span>
        </h1>
      </div>
    </section>
  );
};

export default TourDetailsBanner;
