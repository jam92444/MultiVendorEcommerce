import React, { useState } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import { checkUserExists, createUser } from "../../../services/Auth/Login";
import Input from "../../../Components/UI/Input";
import "../../../Styles/main.scss";

const AddUser = () => {
  const [type, setType] = useState("user"); // user or vendor
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    name: "",
    shopname: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);

    // Reset form and set default role
    setFormData({
      username: "",
      email: "",
      password: "",
      role: selectedType === "user" ? "user" : "vendor",
      name: "",
      shopname: "",
      phone: "",
      address: "",
    });
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Check if user/vendor with email exists
    const exists = await checkUserExists(formData.email);
    if (exists) {
      setMessage("User with this email already exists.");
      setLoading(false);
      return;
    }

    // Prepare data to send based on type
    let dataToSend;
    if (type === "user") {
      dataToSend = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "user",
      };
    } else {
      dataToSend = {
        name: formData.name,
        email: formData.email,
        shopname: formData.shopname,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        role: "vendor",
      };
    }

    const newUser = await createUser(dataToSend);
    if (newUser) {
      setMessage(`${type === "user" ? "User" : "Vendor"} added successfully!`);
      setFormData({
        username: "",
        email: "",
        password: "",
        role: type === "user" ? "user" : "vendor",
        name: "",
        shopname: "",
        phone: "",
        address: "",
      });
    } else {
      setMessage("Failed to add. Try again.");
    }

    setLoading(false);
  };

  const userFields = [
    { label: "Username", name: "username", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Password", name: "password", type: "password", required: true },
  ];

  const vendorFields = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Shop Name", name: "shopname", type: "text", required: true },
    { label: "Phone", name: "phone", type: "tel", required: true },
    { label: "Address", name: "address", type: "text", required: true },
    { label: "Password", name: "password", type: "password", required: true },
  ];

  const fieldsToRender = type === "user" ? userFields : vendorFields;

  return (
    <DashboardLayout className="container">
      <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2>Add {type === "user" ? "User" : "Vendor"}</h2>

        <label>
          Select Type:
          <select value={type} onChange={handleTypeChange} style={{ marginLeft: 10 }}>
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
          </select>
        </label>

        <br />
        <br />

        {/* Responsive grid container */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 20,
          }}
          className="form-grid"
        >
          {fieldsToRender.map(({ label, name, type: inputType, required }) => (
            <div key={name} style={{}}>
              <label style={{ display: "block", marginBottom: 6 }}>{label}:</label>
              <Input
                type={inputType}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                placeholder={`Enter ${label.toLowerCase()}`}
                style={{ width: "100%" }}
              />
            </div>
          ))}

          <div>
            <label>Role:</label>
            <Input
              type="text"
              name="role"
              value={type === "user" ? "user" : "vendor"}
              disabled
              style={{ width: "100%", background: "#f0f0f0" }}
            />
          </div>
        </div>

        <br />

        <button type="submit" disabled={loading} style={{ padding: "0.8rem 1.5rem" }}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        {message && (
          <p
            style={{
              marginTop: 20,
              color: message.includes("success") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}

        {/* Add CSS media query for responsiveness */}
        <style>{`
          @media (min-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr 1fr;
            }
          }
        `}</style>
      </form>
    </DashboardLayout>
  );
};

export default AddUser;
