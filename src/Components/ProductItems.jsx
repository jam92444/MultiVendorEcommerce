// components/ProductItems/ProductItems.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../Styles/components/_productItems.scss"; // ✅ imported globally

const ProductItems = ({ id, image, name, price }) => {
  return (
    <Link className="product-card" to={`/products/${id}`}>
      <div className="product-image-wrapper">
        <img
          src={image ? image : "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTkjujXf6feNM081FNTFRY_oMiFyMJQefJTh53NDtObc0D2X4N1x9ywSgXztljKsqN7oJ2icThw-S6FitTlJLA2yrc2UfNak1O0fj5RZHD6kngBQpV0JacyhQ"}
          alt={name}
          className="product-image"
        />
      </div>
      <p className="product-name">{name}</p>
      <p className="product-price">₹{price}</p>
    </Link>
  );
};

export default ProductItems;
