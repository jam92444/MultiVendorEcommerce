import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeItem,
} from "../../../redux/reducers/user/cartSlice";
import { useNavigate } from "react-router-dom";
import "../../../Styles/pages/_cart.scss";
import Layout from "../../../layout/Layout";

const CartPage = () => {
  const cart = useSelector((state) => state.cart?.items ?? []);
  const currency = "$"; // or get this from Redux or Context if you have
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, selectedSize, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, selectedSize, quantity: newQuantity }));
  };

  const handleRemoveItem = (id, selectedSize) => {
    dispatch(removeItem({ id, selectedSize }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <Layout className="container">
        <div className="cart-page">
          <p className="title">Your Cart</p>
          <p>Your cart is empty.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="container">
      <div className="cart-page">
        <h1>Your Cart</h1>
        <div className="cart-items">
          {cart.map((item, index) => (
            <div
              key={`${item.id}-${item.selectedSize}-${index}`}
              className="cart-item"
            >
              <img src={item.image} alt={item.title} />
              <div className="item-details">
                <h2>{item.title}</h2>
                {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                <p>
                  {currency}
                  {item.price.toFixed(2)}
                </p>
                <div className="quantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        item.selectedSize,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        item.selectedSize,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <p>
            Total: {currency}
            {calculateTotal().toFixed(2)}
          </p>
          <button
            className="checkout-button"
            style={{ backgroundColor: "black" }}
            onClick={goToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
