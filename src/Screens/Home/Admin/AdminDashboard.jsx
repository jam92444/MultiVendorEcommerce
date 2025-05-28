import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout"; // Keep your layout

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    vendors: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const response = {
        products: 120,
        users: 450,
        vendors: 32,
        orders: 200,
      };
      setStats(response);
    };
    fetchStats();
  }, []);

  const statsList = [
    { label: "Total Products", value: stats.products, icon: "📦" },
    { label: "Total Users", value: stats.users, icon: "👤" },
    { label: "Total Vendors", value: stats.vendors, icon: "🏪" },
    { label: "Total Orders", value: stats.orders, icon: "🧾" },
  ];

  // Inline styles
  const styles = {
    dashboard: {
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "2rem",
      textAlign: "start",
    },
    statsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1.5rem",
    },
    card: {
      backgroundColor: "#fff",
      border: "1px solid #eee",
      borderRadius: "8px",
      padding: "1.5rem",
      display: "flex",
      alignItems: "center",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.2s ease",
    },
    icon: {
      fontSize: "2.5rem",
      marginRight: "1rem",
    },
    label: {
      fontSize: "1rem",
      color: "#777",
    },
    value: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
  };

  return (
    <Layout>
      <div style={styles.dashboard}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <div style={styles.statsContainer}>
          {statsList.map(({ label, value, icon }, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.icon}>{icon}</div>
              <div>
                <p style={styles.label}>{label}</p>
                <h3 style={styles.value}>{value}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
