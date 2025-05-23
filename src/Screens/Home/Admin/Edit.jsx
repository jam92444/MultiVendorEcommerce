import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../../../Styles/pages/_edit.scss";
import { AppContext } from "../../../Context/AppContext";
import DashboardLayout from "../../../layout/DashboardLayout";
import Input from "../../../Components/UI/Input";

const Edit = () => {
  const { id } = useParams();
  const { allUser, setAllUser } = useContext(AppContext);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = allUser.find((u) => u.id === id);
    if (user) setFormData(user);
  }, [id, allUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `https://66c432c4b026f3cc6cee532c.mockapi.io/users/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const updated = await response.json();
      setAllUser((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      setMessage("User updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <DashboardLayout><p>Loading...</p></DashboardLayout>;

  const isVendor = formData.role === "vendor";

  const userFields = [
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
  ];

  const vendorFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Shop Name", name: "shopname", type: "text" },
    { label: "Phone", name: "phone", type: "tel" },
    { label: "Address", name: "address", type: "text" },
    { label: "Password", name: "password", type: "password" },
  ];

  const fieldsToRender = isVendor ? vendorFields : userFields;

  return (
    <DashboardLayout className="container">
      <form onSubmit={handleSubmit} className="edit-form-container">
        <h2>Edit {formData.role === "user" ? "User" : "Vendor"}</h2>

        <div className="form-grid">
          {fieldsToRender.map(({ label, name, type }) => (
            <div key={name}>
              <label htmlFor={name}>{label}:</label>
              <Input
                id={name}
                type={type}
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                required
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>

        {message && (
          <p className={`status-message ${message.includes("success") ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </form>
    </DashboardLayout>
  );
};

export default Edit;
