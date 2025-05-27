import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Navbar from "./Navbar";
import DashboardNav from "./DasboardNav";
import Footer from "./Footer"; 

const Layout = ({ children }) => {
  const { user } = useContext(AppContext);

  const isDashboardUser = user && (user.role === "admin" || user.role === "vendor");

  return isDashboardUser ? (
    <DashboardNav>
      {children}
    </DashboardNav>
  ) : (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
