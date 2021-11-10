import React from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import classes from "./AddNewTour.module.css";
const AddNewTour = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Form submit handler
  const onSubmit = async (data) => {
    const response = await fetch(
      "https://holiday-dreams.herokuapp.com/tours",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    await response.json();

    history.push("/");
  };
  //Add new tour page
  return (
    <section className={classes.addNewService}>
      <Container>
        <h2 className="section-heading">Add a new tour</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <FloatingLabel
                label="Tour Name"
                className={`${classes.label} mb-3`}
              >
                <Form.Control
                  placeholder="Tour Name"
                  className={classes.input}
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <small className="error">*Tour Name is required!</small>
                )}
              </FloatingLabel>
              <FloatingLabel
                label="Tour Description"
                className={`${classes.label} mb-3`}
              >
                <Form.Control
                  placeholder="Tour Description"
                  className={classes.textArea}
                  as="textarea"
                  rows={3}
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <small className="error">
                    *Tour Description is required!
                  </small>
                )}
              </FloatingLabel>
              <FloatingLabel
                label="Summary"
                className={`${classes.label} mb-3`}
              >
                <Form.Control
                  placeholder="Summary"
                  className={classes.input}
                  {...register("summary", { required: true })}
                />
                {errors.summary && (
                  <small className="error">*Tour Summary is required!</small>
                )}
              </FloatingLabel>

              <FloatingLabel
                label="Tour Difficulty"
                className={`${classes.label} mb-3`}
              >
                <Form.Select
                  aria-label="Tour Difficulty"
                  className={`${classes.select} mb-3`}
                  {...register("difficulty")}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="difficult">Difficult</option>
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel
                label="Max Participants"
                className={`${classes.label} mb-3`}
              >
                <Form.Control
                  placeholder="Max Participants"
                  className={classes.input}
                  type="number"
                  min="0"
                  max="10"
                  {...register("maxGroupSize", { required: true })}
                />
                {errors.maxGroupSize && (
                  <small className="error">
                    *Max Participants is required!
                  </small>
                )}
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel
                label="Tour Image (Image Link Only)"
                className={`${classes.label} mb-3`}
              >
                <Form.Control
                  placeholder="Tour Image"
                  className={classes.input}
                  {...register("imageCover", { required: true })}
                />
                {errors.maxGroupSize && (
                  <small className="error">*Tour Image Link is required!</small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Price" className={`${classes.label} mb-3`}>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Price"
                  className={classes.input}
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <small className="error">*Tour Price is required!</small>
                )}
              </FloatingLabel>
              <FloatingLabel
                label="Duration"
                className={`${classes.label} mb-3`}
              >
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Duration"
                  className={classes.input}
                  {...register("duration", { required: true })}
                />
                {errors.duration && (
                  <small className="error">*Tour Duration is required!</small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Rating" className={`${classes.label} mb-3`}>
                <Form.Control
                  type="number"
                  min="0"
                  max="5"
                  placeholder="Rating"
                  className={classes.input}
                  {...register("ratingsAverage", { required: true })}
                />
                {errors.ratingsAverage && (
                  <small className="error">*Tour Rating is required!</small>
                )}
              </FloatingLabel>
              <FloatingLabel
                label="Start Date"
                className={`${classes.label} mb-3`}
              >
                <Form.Control
                  placeholder="Start Date"
                  className={classes.input}
                  type="date"
                  {...register("startDates", { required: true })}
                />
                {errors.startDates && (
                  <small className="error">*Tour Start Date is required!</small>
                )}
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={8} sm={10} className="mx-auto mt-3">
              <button type="submit" className={`btn ${classes.formSubmitBtn}`}>
                Add Tour
              </button>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  );
};

export default AddNewTour;