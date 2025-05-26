import React, { useContext, useState } from "react";
import "../Styles/pages/_processToOrder.scss";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import UserLayout from "../layout/UserLayout";

const CheckOut = () => {
  const { cart, currency } = useContext(AppContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const inputs = [
    { name: "fullName", type: "text", placeholder: "Full Name" },
    { name: "email", type: "email", placeholder: "Email Address" },
    { name: "phone", type: "text", placeholder: "Phone Number" },
    { name: "address", type: "textarea", placeholder: "Full Address", rows: 4 },
    { name: "city", type: "text", placeholder: "City" },
    { name: "zip", type: "text", placeholder: "ZIP Code" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: value.trim() ? "" : "This field is required",
    }));
  };

  const validateForm = () => {
    const errors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        errors[key] = "This field is required";
      }
    }
    return errors;
  };

  const handleMakePayment = () => {
    const errors = validateForm();
    setFormErrors(errors);
    setSubmitted(true);

    if (Object.keys(errors).length === 0) {
      const orderInfo = {
        items: [...cart],
        amount: calculateTotal().toFixed(2),
        shipping: formData,
        date: new Date().toISOString(),
      };

      // Save temporary orderInfo for payment page
      localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

      // Navigate to payment (keep cart intact until payment success)
      navigate("/payment");
    }
  };

  return (
    <UserLayout className="container">
      <div className="checkout-page">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-content">
          <div className="checkout-form">
            <h2>Shipping Information</h2>
            <form noValidate>
              {inputs.map(({ name, type, placeholder, rows }) => (
                <div key={name} className={(name === "city" || name === "zip") ? "half-input" : ""}>
                  {type === "textarea" ? (
                    <textarea
                      name={name}
                      placeholder={placeholder}
                      rows={rows}
                      value={formData[name]}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleChange}
                    />
                  )}
                  {submitted && formErrors[name] && (
                    <p className="error">{formErrors[name]}</p>
                  )}
                </div>
              ))}
            </form>
          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cart.map((item, idx) => (
                <div key={idx} className="summary-item">
                  <span>{item.title} (x{item.quantity})</span>
                  <span>
                    {currency}
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <strong>Total:</strong>
              <strong>{currency}{calculateTotal().toFixed(2)}</strong>
            </div>
            <button className="place-order-btn" onClick={handleMakePayment}>
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default CheckOut;
