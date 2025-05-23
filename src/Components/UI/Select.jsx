// src/components/ui/Select.jsx
import React from "react";

const Select = ({
  options = [],
  value,
  onChange,
  background,
  color,
  width,
  border,
  outline,
  padding,
  margin,
  borderRadius,
  className = "",
  style = {},
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
    ...style,
  };

  return (
    <select
      value={value}
      onChange={onChange}
      className={className}
      style={combinedStyle}
      {...rest}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
