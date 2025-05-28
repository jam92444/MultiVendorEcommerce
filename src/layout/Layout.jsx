import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import DashboardNav from "./DasboardNav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  const isDashboardUser =
    user?.role === "admin" || user?.role === "vendor";

  return isDashboardUser ? (
    <DashboardNav>
      <main className="dashboard-main">{children}</main>
    </DashboardNav>
  ) : (
    <div className="public-layout">
      <header>
        <Navbar />
      </header>
      <main className="container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
