import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import { HashLink } from "react-router-hash-link";

import classes from "./Header.module.css";
import TourButton from "../TourButton/TourButton";
import logo from "../../images/logo-white.png";
const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();
  /* Navbar  */
  return (
    <header className="fixed-top">
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`${classes.navbar} navbar`}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className={classes.logoContainer}>
            <img src={logo} className="d-inline-block align-top" alt="logo" /> <span>   Holiday Dreams</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className={`ms-auto ${classes.navLinkContainer} align-items-center`}
            >
              <Nav.Link
                eventKey="1"
                exact
                as={NavLink}
                to="/"
                activeClassName={classes.active}
              >
                Home
              </Nav.Link>
              {/* If user logged in then this link will show */}
              {user.email ? (
                <>
                  <Nav.Link
                    eventKey="2"
                    as={HashLink}
                    smooth to="/my-orders#"
                    activeClassName={classes.active}
                  >
                    My Orders
                  </Nav.Link>
                  <Nav.Link
                    eventKey="3"
                    as={HashLink}
                    smooth to="/manage-all-orders#"
                    activeClassName={classes.active}
                  >
                    Manage All Orders
                  </Nav.Link>
                  <Nav.Link
                    eventKey="4"
                    as={HashLink}
                    smooth to="/add-new-service#"
                    activeClassName={classes.active}
                  >
                    Add A New Tour
                  </Nav.Link>

                  <TourButton color="green" onClick={logout}>
                    {user.displayName} Logout
                  </TourButton>
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={user.displayName.split(" ")[0]}
                      className={classes.userImg}
                    />
                  )}
                </>
              ) : (
                <TourButton
                  onClick={() => history.push("/login")}
                  color="green"
                >
                  Login
                </TourButton>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
