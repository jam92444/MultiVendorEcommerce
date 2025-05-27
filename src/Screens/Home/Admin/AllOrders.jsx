import React, { useEffect, useState } from "react";
import "../../../Styles/pages/_orders.scss"; // Style as needed
import "../../../Styles/pages/Admin/_allOrders.scss";
import Layout from "../../../layout/Layout";
const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://683448c7464b4996360213ec.mockapi.io/orders"
        );
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Layout className="container">
        <h1>Admin - All Orders</h1>
        <p>Loading orders...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout className="container">
        <h1>Admin - All Orders</h1>
        <p>Error: {error}</p>
      </Layout>
    );
  }

  return (
    <Layout className="container">
      <div className="orders-page">
        <h1 className="title">Admin - All Orders</h1>
        <div className="orders-grid">
          {orders.map((order) => (
            <article key={order.id} className="order-card admin-order">
              <header className="order-header">
                <strong>Order ID:</strong> {order.id}
                <br />
                <strong>Total:</strong> ₹{order.amount}
                <br />
                <strong>Status:</strong>{" "}
                <span className={order.approved ? "approved" : "pending"}>
                  {order.approved ? "Accepted" : "Pending"}
                </span>
                <br />
                <strong>Order Date:</strong>{" "}
                {new Date(order.paidAt).toLocaleString()}
              </header>

              <section className="order-customer">
                <h4>Shipping Info:</h4>
                <p>
                  <strong>Name:</strong> {order.shipping.fullName}
                </p>
                <p>
                  <strong>Address:</strong> {order.shipping.address},{" "}
                  {order.shipping.city}
                </p>
                <p>
                  <strong>Phone:</strong> {order.shipping.phone}
                </p>
                <p>
                  <strong>Email:</strong> {order.shipping.email}
                </p>
              </section>

              <section className="order-products">
                <h4>Products:</h4>
                {order.items.map((item, idx) => (
                  <div key={idx} className="admin-product-item">
                    <p>
                      <strong>Product ID:</strong> {item.id}
                    </p>
                    <p>
                      <strong>Title:</strong> {item.title}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                  </div>
                ))}
              </section>

              <section className="vendor-section">
                <h4>Vendor(s):</h4>
                {order.vendorIds?.map((vendorId, i) => (
                  <span key={i} className="vendor-id">
                    Vendor ID: {vendorId}
                  </span>
                ))}
              </section>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllOrders;
