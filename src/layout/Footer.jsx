import React from "react";
import "../Styles/layout/_footer.scss"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section footer__about">
          <h3>ShopEase</h3>
          <p>
            Your one-stop shop for all your needs. Quality products, great
            prices, and fast delivery.
          </p>
        </div>

        <div className="footer__section footer__links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer__section footer__contact">
          <h4>Contact Us</h4>
          <p>Email: support@shopease.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Market St, Cityville</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
