import React, { useContext } from "react";
import './Login.css';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, Row, } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import toastCreator from "../../components/toastifyCreator";

//Form validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("*Email is invalid!")
    .required("*Email is required!"),
  password: yup.string().required("*Password is required!"),
});

const Login = () => {
  const { loginUser, setUser } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const {

    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Redirect path
  const { from } = location.state || { from: { pathname: "/" } };

  //Form submit handler
  const onSubmit = async (formData) => {
    try {
      const userCredential = await loginUser(formData.email, formData.password);
      const user = userCredential.user;
      setUser(user);
      history.replace(from.pathname);
    } catch (error) {
      //Error handling
      if (
        error.message.includes("wrong-password") ||
        error.message.includes("user-not-found")
      ) {
        toastCreator("Email or Password is invalid!", "error");
      } else if (error.message.includes("too-many-requests")) {
        toastCreator("Too many invalid requests, try again later!", "error");
      } else {
        toastCreator("Something went wrong!", "error");
      }
    }
  };
  return (
    <section
      className={`d-flex justify-content-center align-items-center`}
    >
      <Container>
        <div className="items-center google-btn">

          <Container className="text-center">
            <Row className="justify-content-md-center mt-3">
              <div className="login-card mt-5 items-center">
                <SocialLogin redirectPath={from} />
              </div>
            </Row>
          </Container>
        </div>

      </Container>


    </section>
  );
};

export default Login;
