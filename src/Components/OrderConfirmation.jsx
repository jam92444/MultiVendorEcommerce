import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/pages/_orderConfirmation.scss";
import Layout from "../layout/Layout";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product details by productId from mock API
  const fetchProductById = async (productId) => {
    const res = await fetch(
      `https://66c432c4b026f3cc6cee532c.mockapi.io/products/${productId}`
    );
    if (!res.ok) throw new Error("Failed to fetch product data");
    return res.json();
  };

  useEffect(() => {
    const submitOrder = async () => {
      setLoading(true);
      setError(null);

      try {
        const ordersString = localStorage.getItem("orders");
        if (!ordersString) throw new Error("No order found in localStorage");

        const orders = JSON.parse(ordersString);

        if (!Array.isArray(orders) || orders.length === 0) {
          throw new Error("Orders data is empty or invalid");
        }

        // Use the first order for submission (adjust logic if needed)
        const order = orders[0];

        if (!order.items || !Array.isArray(order.items)) {
          throw new Error("Order items missing or invalid");
        }

        // Get unique product IDs from the order items
        const productIds = order.items.map((item) => item.id);

        // Fetch detailed product info to extract vendorIds
        const productDetails = await Promise.all(
          productIds.map((id) => fetchProductById(id))
        );

        // Extract unique vendorIds, fallback to null if vendorId missing
        const vendorIds = [
          ...new Set(
            productDetails.map((product) =>
              product.vendorId !== undefined ? product.vendorId : null
            )
          ),
        ].filter((id) => id !== null); // remove nulls

        // Prepare payload with extra order fields
        const orderPayload = {
          ...order,
          vendorIds,
          approved: false,
          orderStatus: "order initiated",
        };

        // Post order to your backend
        const response = await fetch(
          "https://683448c7464b4996360213ec.mockapi.io/orders",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderPayload),
          }
        );

        if (!response.ok) throw new Error("Failed to submit order");

        // Successfully submitted, clear orders from localStorage
        localStorage.removeItem("orders");
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message || "An unknown error occurred");
      }
    };

    submitOrder();
  }, []);

  return (
    <Layout className="container">
      <div className="order-confirmation">
        {loading && <p>Submitting your order...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <>
            <div className="icon-success">✔</div>
            <h1>Thank you for your order!</h1>
            <p>Your payment was successful. Your items will be shipped soon.</p>
            <button className="back-home-btn" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
