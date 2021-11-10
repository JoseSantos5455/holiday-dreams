import React, { useEffect, useState } from "react";
import TourButton from "../TourButton/TourButton";
import classes from "./Tours.module.css";
import { MdCalendarToday, MdHiking } from "react-icons/md";
import { FaRegClock, FaUserFriends } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import { useHistory } from "react-router";
import Rating from "react-rating";


const Tours = () => {
  const [tours, setTours] = useState([]);
  const history = useHistory();

  useEffect(() => {

    //Load all tours from server
    const loadTours = async () => {
      const response = await fetch(
        "https://holiday-dreams.herokuapp.com/tours"
      );
      const responseData = await response.json();
      setTours(responseData);
    };
    loadTours();
  }, []);

  return (
    <section className={classes.tours} id="tours">
      <div className="container">
        <h2 className="section-heading">MOST POPULAR TOURS</h2>
        {/* If tour is not loaded then show spinner */}
        {!tours.length && <Spinner />}

        <div className="row gy-5">
          {tours.map((tour) => {
            const image = tour.imageCover?.startsWith("tour-")
              ? `tours/${tour.imageCover}`
              : tour.imageCover;
            return (
              <div className="col-lg-4 col-md-6" key={tour._id}>
                <div className={classes["card"]}>
                  <div className={classes["card__header"]}>
                    <div className={classes["card__picture"]}>
                      <div className={classes["card__picture-overlay"]}>
                        &nbsp;
                      </div>
                      <img
                        src={image}
                        alt={tour.name}
                        className={classes["card__picture-img"]}
                      />
                    </div>

                    <h3 className={classes["heading-tertirary"]}>
                      <span>{tour.name}</span>
                    </h3>
                  </div>

                  <div className={classes["card__details"]}>
                    <p className={classes["card__text"]}>{tour.summary}</p>
                    <div className={classes["card__data"]}>
                      <MdHiking className={classes["card__icon"]} />

                      <span>{tour.difficulty}</span>
                    </div>
                    <div className={classes["card__data"]}>
                      <MdCalendarToday className={classes["card__icon"]} />
                      <span>
                        {new Date(tour.startDates).toLocaleDateString("en-US")}
                      </span>
                    </div>
                    <div className={classes["card__data"]}>
                      <FaRegClock className={classes["card__icon"]} />
                      <span>{tour.duration} Days</span>
                    </div>
                    <div className={classes["card__data"]}>
                      <FaUserFriends className={classes["card__icon"]} />
                      <span>{tour.maxGroupSize} people</span>
                    </div>
                  </div>

                  <div className={classes["card__footer"]}>
                    <p>
                      <span className={classes["card__footer-value"]}>
                        ${tour.price}
                      </span>
                      <span className={classes["card__footer-text"]}>
                        Per person
                      </span>
                    </p>
                    <p className={classes["card__ratings"]}>
                      <span className={classes["card__footer-value"]}>
                        {tour.ratingsAverage} / 5
                      </span>
                      <span className={classes["card__footer-text"]}>
                        <span className={classes.rating}>
                          <Rating
                            emptySymbol="far fa-star icon"
                            fullSymbol="fas fa-star icon"
                            initialRating={tour.ratingsAverage}
                            readonly
                          />
                        </span>
                      </span>
                    </p>
                    <TourButton
                      color="green"
                      size="lg"
                      onClick={() => history.push(`/tours/${tour._id}`)}
                    >
                      Book Now
                    </TourButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tours;
