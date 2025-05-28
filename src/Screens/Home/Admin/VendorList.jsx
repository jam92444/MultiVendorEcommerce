import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import Layout from "../../../layout/Layout";
import AddUser from "./AddUser";

const VendorList = () => {
  const { allUser, setAllUser } = useContext(AppContext);
  const [updatingId, setUpdatingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const filteredData = allUser.filter((item) => item.role === "vendor");

  const handleToggleBlock = async (vendor) => {
    setUpdatingId(vendor.id);

    const updatedVendor = {
      ...vendor,
      blocked:
        vendor.blocked === "false" || vendor.blocked === false ? "true" : "false",
    };

    try {
      const response = await fetch(
        `https://66c432c4b026f3cc6cee532c.mockapi.io/users/${vendor.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedVendor),
        }
      );

      const updatedData = await response.json();

      setAllUser((prev) =>
        prev.map((u) => (u.id === updatedData.id ? updatedData : u))
      );
    } catch (error) {
      console.error("Error updating vendor:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <Layout className="container">
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              marginBottom: "1rem",
              fontWeight: "600",
              color: "#1F2937",
            }}
          >
            Vendor List
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2563EB",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            + Add Vendor
          </button>
        </div>

        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "8px",
                width: "600px",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                position: "relative",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  fontWeight: "700",
                  color: "#444",
                }}
                aria-label="Close modal"
              >
                &times;
              </button>

              <AddUser
                userType="vendor"
                closeModal={() => {
                  console.log("Closing modal from AddUser...");
                  setIsModalOpen(false);
                }}
              />
            </div>
          </div>
        )}

        <div style={{ overflowX: "auto", marginTop: "20px" }}>
          {filteredData.length > 0 ? (
            <table
              style={{
                width: "100%",
                minWidth: "700px",
                borderCollapse: "separate",
                borderSpacing: "0 8px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#2563EB", color: "white" }}>
                  {["ID", "Name", "Email", "Role", "Status", "Action"].map(
                    (heading) => (
                      <th
                        key={heading}
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontWeight: "700",
                        }}
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user, idx) => (
                  <tr
                    key={user.id}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#F9FAFB" : "white",
                    }}
                  >
                    <td style={{ padding: "12px 16px" }}>{idx + 1}</td>
                    <td style={{ padding: "12px 16px" }}>
                      {user.username || user.name}
                    </td>
                    <td style={{ padding: "12px 16px" }}>{user.email}</td>
                    <td style={{ padding: "12px 16px" }}>{user.role}</td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color:
                          user.blocked === "true" || user.blocked === true
                            ? "#DC2626"
                            : "#16A34A",
                        fontWeight: "600",
                      }}
                    >
                      {user.blocked === "true" || user.blocked === true
                        ? "Blocked"
                        : "Active"}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <button
                        onClick={() => handleToggleBlock(user)}
                        disabled={updatingId === user.id}
                        style={{
                          padding: "8px 16px",
                          backgroundColor:
                            user.blocked === "true" || user.blocked === true
                              ? "#10B981"
                              : "#EF4444",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor:
                            updatingId === user.id ? "not-allowed" : "pointer",
                          fontWeight: "600",
                          marginRight: "10px",
                        }}
                      >
                        {updatingId === user.id
                          ? "Updating..."
                          : user.blocked === "true" || user.blocked === true
                          ? "Unblock"
                          : "Block"}
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/dashboard/edit-vendor/${user.id}`)
                        }
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#3B82F6",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: "#6B7280", fontStyle: "italic" }}>
              No vendors found.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default VendorList;
