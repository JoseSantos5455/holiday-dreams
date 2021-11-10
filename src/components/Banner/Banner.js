import React from "react";
import TourButton from "../TourButton/TourButton";
import classes from "./Banner.module.css";
import { HashLink } from "react-router-hash-link";

const Banner = () => {
  /* Banner Section */
  return (
    <section className={classes.banner}>
      <div className={classes["banner-content"]}>
        <h1>Welcome To Holiday Dreams</h1>
        <h3>Think of a place, We'll arrange for you</h3>
        <TourButton color="white" size="lg">
          <HashLink smooth to="#tours">
            Discover our Tours
          </HashLink>
        </TourButton>
      </div>
    </section>
  );
};

export default Banner;
