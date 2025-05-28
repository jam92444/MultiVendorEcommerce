import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../layout/Layout";
import "../Styles/pages/_processToOrder.scss";

const CheckOut = () => {
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Full name is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    phone: Yup.string()
      .matches(
        /^[6-9]\d{9}$/,
        "Phone number must be a valid 10-digit Indian number starting with 6-9"
      )
      .required("Phone number is required"),

    address: Yup.string().required("Address is required"),

    city: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "City must contain only letters and spaces")
      .required("City is required"),

    zip: Yup.string()
      .matches(/^\d{6}$/, "ZIP code must be exactly 6 digits")
      .required("ZIP code is required"),
  });

  const handleSubmit = (values) => {
    const orderInfo = {
      items: [...cart],
      amount: calculateTotal().toFixed(2),
      shipping: values,
      date: new Date().toISOString(),
    };

    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
    navigate("/payment");
  };

  const inputFields = [
    { name: "fullName", type: "text", placeholder: "Full Name" },
    { name: "email", type: "email", placeholder: "Email Address" },
    { name: "phone", type: "text", placeholder: "Phone Number" },
    { name: "address", type: "textarea", placeholder: "Full Address", rows: 4 },
    { name: "city", type: "text", placeholder: "City" },
    { name: "zip", type: "text", placeholder: "ZIP Code" },
  ];

  return (
    <Layout className="container">
      <div className="checkout-page">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-content">
          <div className="checkout-form">
            <h2>Shipping Information</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form noValidate>
                {inputFields.map(({ name, type, placeholder, rows }) => (
                  <div
                    key={name}
                    className={
                      name === "city" || name === "zip" ? "half-input" : ""
                    }
                  >
                    {type === "textarea" ? (
                      <Field
                        as="textarea"
                        name={name}
                        rows={rows}
                        placeholder={placeholder}
                      />
                    ) : (
                      <Field
                        type={type}
                        name={name}
                        placeholder={placeholder}
                      />
                    )}
                    <ErrorMessage name={name} component="p" className="error" />
                  </div>
                ))}

                <button
                  type="submit"
                  style={{
                    marginTop: "1.5rem",
                    width: "100%",
                    padding: "0.75rem",
                    backgroundColor: "#000",
                    color: "white",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#fff";
                    e.target.style.color = "#1f2937"; // $text-dark
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#000";
                    e.target.style.color = "#fff";
                  }}
                >
                  Make Payment
                </button>
              </Form>
            </Formik>
          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-items" style={{ marginBottom: "1rem" }}>
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <div style={{ fontWeight: 500 }}>{item.title}</div>
                  <div style={{ color: "#4b5563" }}>
                    ₹{(item.price * item.quantity).toFixed(2)} ({item.quantity})
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderTop: "2px solid #000",
                paddingTop: "1rem",
              }}
            >
              <span>Total:</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckOut;
