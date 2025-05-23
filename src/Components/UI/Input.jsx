// src/components/ui/Input.jsx
import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  background,
  name,
  color,
  width,
  border,
  outline,
  padding,
  margin,
  className = "",
  borderRadius,
  style = {},
  ...rest
}) => {
  const combinedStyle = {
    background,
    color,
    width,
    border,
    borderRadius,
    outline,
    padding,
    margin,
    ...style,
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      className={className}
      style={combinedStyle}
      {...rest}
    />
  );
};

export default Input;
