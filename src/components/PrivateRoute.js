import { Redirect, Route } from "react-router";
import { AuthContext } from "../store/auth-context";
import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="spinnerContainer">
        <Spinner animation="border" role="status" className="privateSpinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            smooth to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
