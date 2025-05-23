import React from "react";
import AdminNavbar from "./AdminNavbar";
import "../Styles/layout/_container.scss"

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminNavbar />
      <main className="container">{children}</main>
    </div>
  );
};

export default AdminLayout;
