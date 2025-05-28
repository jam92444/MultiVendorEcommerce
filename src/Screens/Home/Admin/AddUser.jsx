import React, { useState } from "react";
import { checkUserExists, createUser } from "../../../services/Auth/Login";
import Input from "../../../Components/UI/Input";
import "../../../Styles/main.scss";
import "../../../Styles/layout/_grid.scss";
import "../../../Styles/pages/_adduser.scss";

const AddUser = ({ closeModal, userType = "user" }) => {
  const [type, setType] = useState(userType);
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

    try {
      const exists = await checkUserExists(formData.email);
      if (exists) {
        setMessage("User with this email already exists.");
        setLoading(false);
        return;
      }

      const dataToSend =
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
        setMessage(
          `${type === "user" ? "User" : "Vendor"} added successfully!`
        );
        setFormData({
          username: "",
          email: "",
          password: "",
          role: type,
          name: "",
          shopname: "",
          phone: "",
          address: "",
        });

        if (closeModal) {
          console.log("AddUser: closing modal now");
          closeModal();
        }
      } else {
        setMessage("Failed to add. Try again.");
      }
    } catch (error) {
      console.error("Error in AddUser handleSubmit:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = type === "user" ? userFields : vendorFields;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add {type === "user" ? "User" : "Vendor"}</h2>
      <div>
        {fields.map(({ label, name, type: inputType, required }) => (
          <div key={name}>
            <label htmlFor={name}>{label}:</label>
            <Input
              id={name}
              type={inputType}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required={required}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
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

export default AddUser;
