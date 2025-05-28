import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux"; 
import "../Styles/components/Navbar.scss";
import { logoutUserAndSaveCart } from "../redux/reducers/user/userSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // redux states
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.items); 

  const toggleMenu = () => setIsOpen((prev) => !prev);


  const handleLogout = () => {
    dispatch(logoutUserAndSaveCart({ user, cart })).then(() => {
      navigate("/login");
    });
  };
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" onClick={toggleMenu}>
          MyShop
        </Link>

        <div className="navbar__toggle" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>

        <ul className={`navbar__menu ${isOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={toggleMenu}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/orders" onClick={toggleMenu}>
              Orders
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={toggleMenu}>
              Cart
            </Link>
          </li>

          {user ? (
            <>
              <li className="navbar__user">
                <div className="user-avatar">
                  {user.username
                    ? user.username.charAt(0).toUpperCase()
                    : user.email.charAt(0).toUpperCase()}
                </div>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={toggleMenu}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
