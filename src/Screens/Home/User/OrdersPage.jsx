import React, { useEffect, useState } from "react";
import UserLayout from "../../../layout/UserLayout";
import "../../../Styles/pages/_orders.scss";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://683448c7464b4996360213ec.mockapi.io/orders");
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
      <UserLayout className="container">
        <div className="orders-page empty">
          <h1>Your Orders</h1>
          <p>Loading orders...</p>
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout className="container">
        <div className="orders-page empty">
          <h1>Your Orders</h1>
          <p>Error: {error}</p>
        </div>
      </UserLayout>
    );
  }

  if (orders.length === 0) {
    return (
      <UserLayout className="container">
        <div className="orders-page empty">
          <h1>Your Orders</h1>
          <p>You have no past orders yet.</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout className="container">
      <div className="orders-page">
        <h1 className="title">Your Orders</h1>
        {orders.map((order, idx) => (
          <div key={idx} className="order-card">
            <div className="order-header">
              <span>
                <strong>Order Date:</strong>{" "}
                {new Date(order.date || order.paidAt).toLocaleString()}
              </span>
              <span>
                <strong>Total:</strong> ₹{order.amount || order.totalAmount || "N/A"}
              </span>
              <span>
                <strong>Items:</strong> {order.items ? order.items.length : "0"}
              </span>
            </div>
            <div className="order-items">
              {(order.items || []).map((item, i) => (
                <div key={i} className="order-item">
                  <img src={item.image} alt={item.title} />
                  <div className="item-info">
                    <p className="title">{item.title}</p>
                    {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
};

export default OrdersPage;
