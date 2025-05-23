import React from "react";
import "../Styles/layout/_container.scss";
import DashboardNav from "./DasboardNav";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardNav>{children}</DashboardNav>
    </div>
  );
};

export default DashboardLayout;
