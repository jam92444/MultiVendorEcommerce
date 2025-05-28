import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import Layout from "../../../layout/Layout";
import AddUser from "./AddUser.jsx";

const UserList = () => {
  const { allUser, setAllUser } = useContext(AppContext);
  const [updatingId, setUpdatingId] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const navigate = useNavigate();

  const filteredData = allUser.filter((item) => item.role === "user");

  const handleToggleBlock = async (user) => {
    setUpdatingId(user.id);

    const updatedUser = {
      ...user,
      blocked:
        user.blocked === "false" || user.blocked === false ? "true" : "false",
    };

    try {
      const response = await fetch(
        `https://66c432c4b026f3cc6cee532c.mockapi.io/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      const updatedData = await response.json();

      setAllUser((prev) =>
        prev.map((u) => (u.id === updatedData.id ? updatedData : u))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const closeModal = () => {
    setShowAddUserModal(false);
    // optionally refresh user list from API here if AddUser adds new user
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2 style={{ fontWeight: "600", color: "#1F2937" }}>User List</h2>
          <button
            onClick={() => setShowAddUserModal(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2563EB",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "600",
              boxShadow: "0 2px 6px rgb(0 0 0 / 0.15)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#1E40AF")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563EB")
            }
          >
            Add User
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          {filteredData && filteredData.length > 0 ? (
            <table
              style={{
                width: "100%",
                minWidth: "700px",
                borderCollapse: "separate",
                borderSpacing: "0 8px",
                fontFamily:
                  "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                boxShadow: "0 2px 10px rgb(0 0 0 / 0.1)",
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
                          borderTopLeftRadius: heading === "ID" ? "8px" : 0,
                          borderTopRightRadius:
                            heading === "Action" ? "8px" : 0,
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
                      transition: "background-color 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#E0E7FF")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        idx % 2 === 0 ? "#F9FAFB" : "white")
                    }
                  >
                    <td
                      style={{
                        padding: "12px 16px",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {idx + 1}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        textTransform: "capitalize",
                        whiteSpace: "nowrap",
                        color: "#374151",
                      }}
                    >
                      {user.username || user.name}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        whiteSpace: "nowrap",
                        color: "#4B5563",
                      }}
                    >
                      {user.email}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        textTransform: "capitalize",
                        whiteSpace: "nowrap",
                        color: "#6B7280",
                      }}
                    >
                      {user.role}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                        color:
                          user.blocked === "true" || user.blocked === true
                            ? "#DC2626"
                            : "#16A34A",
                      }}
                    >
                      {user.blocked === "true" || user.blocked === true
                        ? "Blocked"
                        : "Active"}
                    </td>
                    <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
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
                          transition: "background-color 0.3s ease",
                          fontWeight: "600",
                          boxShadow: "0 2px 6px rgb(0 0 0 / 0.15)",
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
                          navigate(`/admin/dashboard/edit-user/${user.id}`)
                        }
                        style={{
                          marginLeft: "10px",
                          padding: "8px 16px",
                          backgroundColor: "#3B82F6",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "600",
                          transition: "background-color 0.3s ease",
                          boxShadow: "0 2px 6px rgb(0 0 0 / 0.15)",
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
              No users found.
            </p>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowAddUserModal(false)} // close on clicking outside
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent close on clicking inside
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              maxWidth: "700px",
              width: "90%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 20,
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            }}
          >
            <button
              onClick={() => setShowAddUserModal(false)}
              style={{
                float: "right",
                background: "transparent",
                border: "none",
                fontSize: 24,
                fontWeight: "bold",
                cursor: "pointer",
                color: "#2563EB",
              }}
              aria-label="Close Modal"
            >
              &times;
            </button>

            {/* Pass userType prop for clarity */}
            <AddUser userType="user" closeModal={closeModal} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserList;
