import React, { useState } from "react";
import { checkUserExists, createUser } from "../services/Auth/Login";
import Input from "./UI/Input";

const UserForm = ({ type = "user", onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: type,
    name: "",
    shopname: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const exists = await checkUserExists(formData.email);
    if (exists) {
      setMessage("User with this email already exists.");
      setLoading(false);
      return;
    }

    let dataToSend =
      type === "user"
        ? {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: "user",
          }
        : {
            name: formData.name,
            email: formData.email,
            shopname: formData.shopname,
            phone: formData.phone,
            address: formData.address,
            password: formData.password,
            role: "vendor",
          };

    const newUser = await createUser(dataToSend);
    if (newUser) {
      setMessage(`${type === "user" ? "User" : "Vendor"} added successfully!`);
      onSuccess && onSuccess(); // callback to refresh list
      onClose(); // close modal
    } else {
      setMessage("Failed to add. Try again.");
    }
    setLoading(false);
  };

  const fields =
    type === "user"
      ? [
          { label: "Username", name: "username", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
        ]
      : [
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Shop Name", name: "shopname", type: "text" },
          { label: "Phone", name: "phone", type: "tel" },
          { label: "Address", name: "address", type: "text" },
          { label: "Password", name: "password", type: "password" },
        ];

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ fontSize: "1.5rem", marginBottom: 20 }}>
        Add {type === "user" ? "User" : "Vendor"}
      </h3>
      <div style={{ display: "grid", gap: 16 }}>
        {fields.map(({ label, name, type }) => (
          <div key={name}>
            <label>{label}</label>
            <Input
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              required
              placeholder={`Enter ${label}`}
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        style={{
          marginTop: 20,
          padding: "10px 16px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 6,
        }}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      {message && (
        <p style={{ marginTop: 10, color: message.includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </form>
  );
};

export default UserForm;
