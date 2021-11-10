import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import classes from "./TourDescription.module.css";
import { AuthContext } from "../../store/auth-context";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

//Form validation schema
const schema = yup.object().shape({
  name: yup.string().required("*Name is required!"),
  email: yup
    .string()
    .email("*Email is invalid!")
    .required("*Email is required!"),
  address: yup.string().required("*Address is required!"),
  phone: yup.string().required("*Phone Number is required!"),
});
const TourDescription = ({ tour }) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Form submit handler
  const onSubmit = async (formData) => {
    const userOrder = {
      userName: user.displayName,
      email: user.email,
      userImage: user.photoURL,
      status: "pending",
      ...formData,
      ...tour,
    };
    delete userOrder._id;
    await fetch("https://holiday-dreams.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userOrder),
    })
      .then(data => {
        if (data) {
          Swal.fire("Good Job!", "Your Orders Booked Successfully !", "success");
        } else {
          Swal.fire("Good Job!", "Your Orders Booked Successfully !", "success");
        }

      })
    history.push("/my-orders");
  };
  //Date format
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <section className={classes.description}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className={classes["description-content"]}>
              <h2 className="section-heading-sm">Tour Details</h2>
              <ul>
                <li className={classes.price}>
                  <span>PRICE : </span> ${tour.price}
                </li>
                <li>
                  <span>NEXT DATE :</span>
                  {new Date(tour.startDates).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </li>

                <li>
                  <span>MAX PARTICIPANTS : </span> {tour.maxGroupSize} People
                </li>
                <li>
                  <span>Duration : </span> {tour.duration} Days
                </li>
                <li>
                  <span>DIFFICULTY : </span> {tour.difficulty}
                </li>
                <li>
                  <span>RATING : </span> {tour.ratingsAverage} / 5
                </li>

                <li>
                  <span>Description : </span> {tour.description}
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={6}>
            <div className={classes.bookForm}>
              <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <h2 className="section-heading-sm">Book Now</h2>
                <FloatingLabel label="Name" className={`${classes.label} mb-3`}>
                  <Form.Control
                    placeholder="Name"
                    className={classes.input}
                    {...register("name")}
                    defaultValue={user.displayName}
                  />
                  {errors.name?.message && (
                    <small className="error">{errors.name.message}</small>
                  )}
                </FloatingLabel>
                <FloatingLabel
                  label="Email"
                  className={`${classes.label} mb-3`}
                >
                  <Form.Control
                    placeholder="Email"
                    className={classes.input}
                    {...register("email")}
                    defaultValue={user.email}
                  />
                  {errors.email?.message && (
                    <small className="error">{errors.email.message}</small>
                  )}
                </FloatingLabel>
                <FloatingLabel
                  label="Address"
                  className={`${classes.label} mb-3`}
                >
                  <Form.Control
                    placeholder="Address"
                    className={classes.input}
                    {...register("address")}
                  />
                  {errors.address?.message && (
                    <small className="error">{errors.address.message}</small>
                  )}
                </FloatingLabel>{" "}
                <FloatingLabel
                  label="Phone Number"
                  className={`${classes.label} mb-3`}
                >
                  <Form.Control
                    placeholder="Phone Number"
                    className={classes.input}
                    {...register("phone")}
                  />
                  {errors.phone?.message && (
                    <small className="error">{errors.phone.message}</small>
                  )}
                </FloatingLabel>
                <button
                  type="submit"
                  className={`btn ${classes.formSubmitBtn}`}
                >
                  Book
                </button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDescription;
