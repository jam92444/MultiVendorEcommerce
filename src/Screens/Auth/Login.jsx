import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Styles & UI Components
import "../../Styles/components/User/Login.scss";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import Layout from "../../layout/Layout";

// Redux actions
import {
  loginUser,
  signupUser,
  loadUserFromStorage,
} from "../../redux/reducers/user/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "vendor":
          navigate("/vendor/dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [user, navigate]);

  const handleToggleMode = () => {
    setIsLogin((prev) => !prev);
  };

  const getValidationSchema = () => {
    return Yup.object().shape({
      name: isLogin ? Yup.string() : Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
          "Password must include upper, lower, number, and special character"
        )
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: isLogin
        ? Yup.string()
        : Yup.string()
            .required("Confirm your password")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });
  };

  const handleSubmit = (values) => {
    if (isLogin) {
      dispatch(loginUser({ email: values.email, password: values.password }));
    } else {
      const newUser = {
        username: values.name,
        email: values.email,
        password: values.password,
        role: "user",
        blocked: "false",
      };
      dispatch(signupUser(newUser));
    }
  };

  return (
    <Layout className="container">
      <div className="login">
        <div className="forms">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={getValidationSchema()}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="Login-form">
                <p>{isLogin ? "Login" : "Create Account"}</p>
                <p className="desc">
                  {isLogin
                    ? "Login to start shopping"
                    : "Sign up to join our shopping community"}
                </p>

                {!isLogin && (
                  <div className="content">
                    <Field
                      name="name"
                      as={Input}
                      type="text"
                      placeholder="Username"
                      className="inputBox"
                    />
                    <ErrorMessage name="name" component="small" className="error" />
                  </div>
                )}

                <div className="content">
                  <Field
                    name="email"
                    as={Input}
                    type="email"
                    placeholder="Email Address"
                    className="inputBox"
                  />
                  <ErrorMessage name="email" component="small" className="error" />
                </div>

                <div className="content">
                  <Field
                    name="password"
                    as={Input}
                    type="password"
                    placeholder="Enter Password"
                    className="inputBox"
                  />
                  <ErrorMessage name="password" component="small" className="error" />
                  <small className="hint">Example: MyPass@123</small>
                </div>

                {!isLogin && (
                  <div className="content">
                    <Field
                      name="confirmPassword"
                      as={Input}
                      type="password"
                      placeholder="Confirm Password"
                      className="inputBox"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="small"
                      className="error"
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="forgot-password">
                    <a href="/auth/forgot-password">Forgot Password?</a>
                  </div>
                )}

                <Button
                  className="submit"
                  type="submit"
                  disabled={isSubmitting || loading}
                >
                  {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
                </Button>

                {error && <small className="error">{error}</small>}

                <div className="signup-cta">
                  <p>
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}{" "}
                    <button
                      type="button"
                      onClick={handleToggleMode}
                      className="link-btn"
                    >
                      {isLogin ? "Sign Up" : "Login"}
                    </button>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
