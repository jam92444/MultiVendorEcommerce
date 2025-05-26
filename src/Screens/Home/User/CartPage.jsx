import React, { useContext } from "react";
import { AppContext } from "../../../Context/AppContext";
import { useNavigate } from "react-router-dom"; // 🔹 ADD THIS
import "../../../Styles/pages/_cart.scss";
import UserLayout from "../../../layout/UserLayout";

const CartPage = () => {
  const { cart, setCart, currency } = useContext(AppContext);
  const navigate = useNavigate(); // 🔹 ADD THIS

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (id, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.selectedSize === size)
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <UserLayout className="container">
        <div className="cart-page">
          <p className="title">Your Cart</p>
          <p>Your cart is empty.</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout className="container">
      <div className="cart-page">
        <h1>Your Cart</h1>
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={`${item.id}-${item.selectedSize}-${index}`} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="item-details">
                <h2>{item.title}</h2>
                {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                <p>{currency}{item.price.toFixed(2)}</p>
                <div className="quantity">
                  <button onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity + 1)}>+</button>
                </div>
                <button className="remove-button" onClick={() => handleRemoveItem(item.id, item.selectedSize)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <p>Total: {currency}{calculateTotal().toFixed(2)}</p>
          <button className="checkout-button" onClick={goToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default CartPage;
