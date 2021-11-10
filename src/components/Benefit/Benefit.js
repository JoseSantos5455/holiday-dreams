import React from "react";
//Icons
import {
  MdAccessibilityNew,
  MdHail,
  MdLiquor,
  MdPrivateConnectivity,
} from "react-icons/md";
import classes from "./Benefit.module.css";

//Travel images
import benefit1 from "../../images/travel.png";
import { Col, Container, Row } from "react-bootstrap";

const Benefit = () => {
  //Benefit Section
  return (
    <section className={classes.benefit}>
      <Container>
        <Row className="align-items-center">
          <div className="col-lg-6">
            <div className={classes.benefit__pic}>
              <Row>
                <Col sm={12}>
                  <div className={classes.benefit__pic__item}>
                    <img src={benefit1} alt="tour" className="img-fluid" />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <Col lg={6}>
            <div className={classes.benefit__content}>
              <div className="section-heading-sm">
                <h2>Our Commitments</h2>
              </div>
              <p>
                Traveling allows you to sleep late and perhaps take a nap in the afternoon. Get some beauty rest!
              </p>
              <Row>
                <Col sm={6}>
                  <div className={classes.benefit__item}>
                    <h4>
                      <MdAccessibilityNew />
                      Own Pace
                    </h4>
                    <p>
                      Scheduled tours, which often depart on predetermined, non-negotiable dates, contain a circuit of famous sights grouped around a theme for medium to large groups.
                    </p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className={classes.benefit__item}>
                    <h4>
                      <MdLiquor />
                      Complements
                    </h4>
                    <p>
                      We encourage you to explore one-of-a-kind VIP Experiences that are exclusively available to Luxury Gold guests. VIP Experiences make you happy.
                    </p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className={classes.benefit__item}>
                    <h4>
                      <MdPrivateConnectivity />
                      Secured
                    </h4>
                    <p>
                      We will protect any information our clients share with us by adhering to strong security and confidentiality requirements.
                    </p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className={classes.benefit__item}>
                    <h4>
                      <MdHail />
                      Guidance
                    </h4>
                    <p>
                      Private letters with full staff. Excursions with an experienced
                      captain and a passionate local guide who knows
                      very well about this place.
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default Benefit;
