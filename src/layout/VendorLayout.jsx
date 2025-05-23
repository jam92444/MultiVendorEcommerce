import React from "react";
import VendorNavbar from "./VendorNavbar";
import "../Styles/layout/_container.scss"
const VendorLayout = ({ children }) => {
  return (
    <div>
      <VendorNavbar />
      <main className="container">{children}</main>
    </div>
  );
};

export default VendorLayout;
