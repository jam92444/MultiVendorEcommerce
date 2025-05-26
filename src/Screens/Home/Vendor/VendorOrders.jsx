import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import "../../../Styles/pages/Vendors/_vendorOrders.scss";
import { AppContext } from "../../../Context/AppContext";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const vendorId = user.id;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://683448c7464b4996360213ec.mockapi.io/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();

        const vendorOrders = data.filter(order =>
          order.vendorIds?.includes(vendorId)
        );

        setOrders(vendorOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [vendorId]);

  const handleAcceptOrder = async (orderId) => {
    try {
      const res = await fetch(`https://683448c7464b4996360213ec.mockapi.io/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: true }),
      });

      if (!res.ok) throw new Error("Failed to update order");

      const updatedOrder = await res.json();

      setOrders(prev =>
        prev.map(order => (order.id === updatedOrder.id ? updatedOrder : order))
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <h1>Vendor - Orders</h1>
        <p>Loading orders...</p>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <h1>Vendor - Orders</h1>
        <p>Error: {error}</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="vendor-orders">
        <h1 className="title">Vendor - My Orders</h1>
        {orders.map(order => (
          <div key={order.id} className="vendor-order-card">
            <div className="order-header">
              <strong>Order ID:</strong> {order.id}<br />
              <strong>Total:</strong> ₹{order.amount}<br />
              <strong>Status:</strong>{" "}
              <span className={order.approved ? "approved" : "pending"}>
                {order.approved ? "Accepted" : "Pending"}
              </span><br />
              <strong>Order Date:</strong> {new Date(order.paidAt).toLocaleString()}
            </div>

            <div className="order-products">
              <h4>Products:</h4>
              {order.items.map((item, idx) => (
                <div key={idx} className="vendor-product-item">
                  <p><strong>Product ID:</strong> {item.id}</p>
                  <p><strong>Title:</strong> {item.title}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <hr />
                </div>
              ))}
            </div>

            <div className="vendor-section">
              <h4>Other Vendors:</h4>
              {order.vendorIds
                .filter(id => id !== vendorId)
                .map((otherId, i) => (
                  <span key={i} className="vendor-id">Vendor ID: {otherId}</span>
              ))}
            </div>

            {!order.approved ? (
              <button
                className="accept-btn"
                onClick={() => handleAcceptOrder(order.id)}
              >
                Accept Order
              </button>
            ) : (
              <p className="accepted-msg">Order has been accepted</p>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default VendorOrders;
