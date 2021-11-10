import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./Reviews.module.css";


const Reviews = () => {

  //Corporate Package Section

  return (
    <section className={classes.reviews}>
      <Container>
        <h2 className="section-heading text-white">Corporate Packages</h2>
        <Row className="gy-4">
          <Col lg={4} md={6}>
            <div className={`${classes["review-item"]} py-4`}>
              <div className={classes.text}>
                <p className={classes.star}>
                  <span className="fa fa-business-time"></span>
                  <br /> Dedicated Service 24/7
                </p>
                <p className="mb-4">
                  The acclaimed award-winning hotel offers a complete luxury vacation. A luxurious retreat with unmatched dining options. Call us now. Please check the availability. Please check the room rate. Book now.
                </p>
              </div>
            </div>
          </Col>
          <Col lg={4} md={6}>
            <div className={`${classes["review-item"]} py-4`}>
              <div className={classes.text}>
                <p className={classes.star}>
                  <span className="fa fa-plane-departure"></span>
                  <br /> Corporate Lounge
                </p>
                <p className="mb-4">
                  Our Highly-Acclaimed, Award-Winning Hotel Offers The Complete Luxury Escape. A Luxury Retreat With Unparalleled Dining Options. Call Us Now. Check Availability. Check Our Room Rates. Book Now.
                </p>
              </div>
            </div>
          </Col>
          <Col lg={4} md={6}>
            <div className={`${classes["review-item"]} py-4`}>
              <div className={classes.text}>
                <p className={classes.star}>
                  <span className="fa fa-hand-holding-usd"></span>
                  <br />Value for Money
                </p>
                <p className="mb-4">
                  We care for your Value for money . A opulent hideaway with unrivaled eating options.Please check the schedule. Please verify the rate of the accommodation. Make your reservation now.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Reviews;
