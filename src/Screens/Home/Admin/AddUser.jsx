import React, { useState } from "react";
import { checkUserExists, createUser } from "../../../services/Auth/Login";
import Input from "../../../Components/UI/Input";
import "../../../Styles/main.scss";
import "../../../Styles/layout/_grid.scss"
import Layout from "../../../layout/Layout";

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
    <Layout>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "100%",
          margin: "2rem auto",
          padding: "0rem 2rem",
          backgroundColor: "white",
          borderRadius: 8,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2
          style={{
            marginBottom: "1.5rem",
            fontWeight: 700,
            color: "#111827",
            fontSize: "1.8rem",
            textAlign: "center",
          }}
        >
          Add {type === "user" ? "User" : "Vendor"}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 20,
          }}
        >
          <div>
            <label
              htmlFor="type-select"
              style={{
                fontWeight: 600,
                display: "block",
                marginBottom: 8,
                color: "#374151",
              }}
            >
              Select Type:
            </label>
            <select
              id="type-select"
              value={type}
              onChange={handleTypeChange}
              style={{
                width: "100%",
                padding: "10px 14px",
                fontSize: "1rem",
                borderRadius: 6,
                border: "1.5px solid #d1d5db",
                marginBottom: 24,
                cursor: "pointer",
                backgroundColor: "white",
                color: "#374151",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            >
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
        </div>

        <div
          className="form-grid"
         
        >
          {fieldsToRender.map(({ label, name, type: inputType, required }) => (
            <div key={name}>
              <label
                htmlFor={name}
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontWeight: 600,
                  color: "#374151",
                }}
              >
                {label}:
              </label>
              <Input
                id={name}
                type={inputType}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                placeholder={`Enter ${label.toLowerCase()}`}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  fontSize: "1rem",
                  borderRadius: 6,
                  border: "1.5px solid #d1d5db",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="role"
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 600,
                color: "#374151",
              }}
            >
              Role:
            </label>
            <Input
              id="role"
              type="text"
              name="role"
              value={type === "user" ? "user" : "vendor"}
              disabled
              style={{
                width: "100%",
                padding: "10px 14px",
                fontSize: "1rem",
                borderRadius: 6,
                border: "1.5px solid #d1d5db",
                backgroundColor: "#f9fafb",
                color: "#6b7280",
              }}
            />
          </div>
        </div>
              {/* submit button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 30,
            width: "fit-content",
            padding: "9px 20px",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "white",
            backgroundColor: loading ? "#6B7280" : "#2563EB",
            border: "none",
            borderRadius: 8,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px rgb(37 99 235 / 0.5)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            !loading && (e.currentTarget.style.backgroundColor = "#1E40AF")
          }
          onMouseLeave={(e) =>
            !loading && (e.currentTarget.style.backgroundColor = "#2563EB")
          }
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {message && (
          <p
            style={{
              marginTop: 20,
              fontWeight: 600,
              color: message.includes("success") ? "#16A34A" : "#DC2626",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}

        {/* Responsive grid for wider screens */}
        <style>{`
          @media (min-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr 1fr;
            }
          }
        `}</style>
      </form>
    </Layout>
  );
};

export default AddUser;
