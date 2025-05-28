import React, { useEffect, useState } from "react";
import "../../../Styles/pages/_payment.scss";
import { useNavigate } from "react-router-dom";
import Layout from "../../../layout/Layout";

const PaymentPage = () => {
  const [orderInfo, setOrderInfo] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedOrder = localStorage.getItem("orderInfo");

    if (storedOrder) {
      try {
        setOrderInfo(JSON.parse(storedOrder));
      } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
        navigate("/checkout");
      }
    } else {
      navigate("/checkout"); 
    }
  }, [navigate]);

  const handlePayment = () => {

    alert("Payment successful!");

    const finalOrder = {
      ...orderInfo,
      paidAt: new Date().toISOString(),
    };
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(finalOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));


    localStorage.removeItem("orderInfo");
    localStorage.removeItem("cart");

    navigate("/order-confirmation");
  };

  if (!orderInfo) return null;

  const { items, amount, shipping } = orderInfo;

  return (
    <Layout className="container">
      <div className="payment-page">
        <h1 className="payment-title">Payment</h1>

        <div className="payment-content">
          {/* Shipping Info */}
          <div className="shipping-info">
            <h2>Shipping Details</h2>
            <p><strong>Name:</strong> {shipping.fullName}</p>
            <p><strong>Email:</strong> {shipping.email}</p>
            <p><strong>Phone:</strong> {shipping.phone}</p>
            <p><strong>Address:</strong> {`${shipping.address}, ${shipping.city}, ${shipping.zip}`}</p>
          </div>

          {/* Order Summary */}
          <div className="payment-summary">
            <h2>Order Summary</h2>
            {items.map((item, idx) => (
              <div className="summary-item" key={idx}>
                <span>{item.title} (x{item.quantity})</span>
                <span>{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="summary-total">
              <strong>Total:</strong>
              <strong>{parseFloat(amount).toFixed(2)}</strong>
            </div>
            <button className="pay-now-btn" onClick={handlePayment}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
