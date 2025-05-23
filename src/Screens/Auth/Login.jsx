import React, { useState, useRef } from "react";
import "../../Styles/components/User/Login.scss";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import UserLayout from "../../layout/UserLayout";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Input refs for Enter-to-next focus
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
    }

    if (!isLogin) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log(isLogin ? "Login data" : "Signup data", formData);
    // Handle API call or login/signup logic
  };

  // Handle Enter key to jump to next field
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter" && nextRef?.current) {
      e.preventDefault();
      nextRef.current.focus();
    }
  };

  return (
    <UserLayout className="container">
      <div className="login">
        <div className="forms">
          <form className="Login-form" onSubmit={handleSubmit}>
            <p>{isLogin ? "Login" : "Create account"}</p>
            <p className="desc">
              {isLogin
                ? "Login to shop Googies"
                : "Signup to be a part of shopping hub"}
            </p>

            {!isLogin && (
              <div className="content">
                <Input
                  type="text"
                  name="name"
                  placeholder="Username"
                  className="inputBox"
                  value={formData.name}
                  onChange={handleChange}
                  ref={nameRef}
                  onKeyDown={(e) => handleKeyDown(e, emailRef)}
                />
                {errors.name && <small className="error">{errors.name}</small>}
              </div>
            )}

            <div className="content">
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                className="inputBox"
                value={formData.email}
                onChange={handleChange}
                ref={emailRef}
                onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              />
              {errors.email && <small className="error">{errors.email}</small>}
            </div>

            <div className="content">
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="inputBox"
                value={formData.password}
                onChange={handleChange}
                ref={passwordRef}
                onKeyDown={(e) =>
                  handleKeyDown(e, isLogin ? null : confirmPasswordRef)
                }
              />
              {errors.password && (
                <small className="error">{errors.password}</small>
              )}
              <small className="hint">Example: MyPass@123</small>
            </div>

            {!isLogin && (
              <div className="content">
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  className="inputBox"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  ref={confirmPasswordRef}
                />
                {errors.confirmPassword && (
                  <small className="error">{errors.confirmPassword}</small>
                )}
              </div>
            )}

            {isLogin && (
              <div className="forgot-password">
                <a href="/auth/forgot-password">Forgot Password?</a>
              </div>
            )}

            <Button className="submit" type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <div className="signup-cta">
              <p>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={handleToggle}
                  className="link-btn"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </form>
        </div>{" "}
      </div>
    </UserLayout>
  );
};

export default Login;
