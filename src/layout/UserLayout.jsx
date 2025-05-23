import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Styles/layout/_container.scss"

const UserLayout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default UserLayout;
