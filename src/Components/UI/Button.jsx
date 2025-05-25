// src/components/ui/Button.jsx
import React from "react";

const Button = ({
  children,
  onClick,
  background,
  color,
  width,
  border=0,
  outline,
  padding=".5rem 1rem",
  margin,
  borderRadius="4px",
  className = "",
  style = {},
  type = "button",
  ...rest
}) => {
  const combinedStyle = {
    background,
    color,
    width,
    border,
    outline,
    padding,
    margin,
    borderRadius,
    cursor: "pointer",
    ...style,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      style={combinedStyle}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
