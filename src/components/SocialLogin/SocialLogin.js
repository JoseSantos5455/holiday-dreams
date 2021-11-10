import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../store/auth-context";
import GoogleButton from 'react-google-button';
import classes from "./SocialLogin.module.css";
const SocialLogin = ({ redirectPath }) => {
  const history = useHistory();
  const { signInUsingGoogle, signInUsingFacebook } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    try {
      await signInUsingGoogle();

      history.push(redirectPath.pathname);
    } catch (error) { }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInUsingFacebook();
      history.push(redirectPath.pathname);
    } catch (error) { }
  };
  return (
    <div>

      <div className={classes.wrapper}>
        <div>
          <GoogleButton onClick={handleGoogleLogin} />
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;

