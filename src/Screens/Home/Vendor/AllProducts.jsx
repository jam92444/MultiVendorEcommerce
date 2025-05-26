import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import { allProducts, deleteProduct } from "../../../services/Vendor/Products";
import { getAllUsers } from "../../../services/admin/allUser";
import Button from "../../../Components/UI/Button";
import "../../../Styles/pages/Vendors/_allProducts.scss";
import { approveProduct, rejectProduct } from "../../../services/admin/product";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState({});
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedApproveProductId, setSelectedApproveProductId] =
    useState(null);
  const [approving, setApproving] = useState(false);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRejectProductId, setSelectedRejectProductId] = useState(null);
  const [rejecting, setRejecting] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = currentUser?.role === "admin";
  const isVendor = currentUser?.role === "vendor";

  useEffect(() => {
    const fetchData = async () => {
      const productData = await allProducts();
      if (!Array.isArray(productData)) {
        console.error("Invalid product data:", productData);
        return;
      }

      const filtered = isVendor
        ? productData.filter((p) => p.vendorId === currentUser.id)
        : productData;

      setProducts(filtered);

      if (isAdmin) {
        const userData = await getAllUsers();
        if (Array.isArray(userData)) {
          const map = {};
          userData.forEach((user) => {
            map[user.id] = user.name;
          });
          setUsers(map);
        }
      }
    };

    fetchData();
  }, [isAdmin, isVendor, currentUser?.id]);

  const formatDateTime = (isoDate) =>
    new Date(isoDate).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const handleEdit = (id) => {
    console.log("Edit product with ID:", id);
    // Navigate or show form here
  };

  // Delete
  const openDeleteModal = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedProductId(null);
  };
  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(selectedProductId);
      setProducts((prev) => prev.filter((p) => p.id !== selectedProductId));
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    } finally {
      setDeleting(false);
    }
  };

  // Approve
  const openApproveModal = (id) => {
    setSelectedApproveProductId(id);
    setShowApproveModal(true);
  };
  const closeApproveModal = () => {
    setSelectedApproveProductId(null);
    setShowApproveModal(false);
  };
  const confirmApprove = async () => {
    setApproving(true);
    try {
      const product = products.find((p) => p.id === selectedApproveProductId);
      await approveProduct(product.id, { ...product, approved: true });
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, approved: true } : p))
      );
      closeApproveModal();
    } catch (err) {
      console.error(err);
      alert("Failed to approve product.");
    } finally {
      setApproving(false);
    }
  };

  // Reject
  const openRejectModal = (id) => {
    setSelectedRejectProductId(id);
    setShowRejectModal(true);
  };
  const closeRejectModal = () => {
    setSelectedRejectProductId(null);
    setShowRejectModal(false);
  };
  const confirmReject = async () => {
    setRejecting(true);
    try {
      await rejectProduct(selectedRejectProductId);
      setProducts((prev) =>
        prev.filter((p) => p.id !== selectedRejectProductId)
      );
      closeRejectModal();
    } catch (err) {
      console.error(err);
      alert("Failed to reject product.");
    } finally {
      setRejecting(false);
    }
  };

  return (
    <DashboardLayout className="container">
      <h2 className="all-products__title">All Products</h2>
      <div className="all-products__table">
        <div className="all-products__header">
          <span>Image</span>
          <span>Name</span>
          <span>Price</span>
          {isAdmin && <span>Vendor</span>}
          <span>Status</span>
          <span>Created At</span>
          <span>Actions</span>
        </div>

        {products.map((product) => (
          <div key={product.id} className="all-products__row">
            <div className="all-products__image">
              <img src={product.images?.[0]} alt={product.name} />
            </div>
            <span>{product.name}</span>
            <span>${product.price}</span>
            {isAdmin && (
              <span>{users[product.vendorId || product.userId] || "..."}</span>
            )}
            <span>
              {product.approved ? (
                <span className="status-approved">Approved</span>
              ) : (
                <span className="status-pending">Pending</span>
              )}
            </span>
            <span>{formatDateTime(product.createdAt)}</span>
            <div className="all-products__actions">
              {isAdmin && !product.approved && (
                <>
                  <Button
                    onClick={() => openApproveModal(product.id)}
                    background="#4caf50"
                    color="#fff"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => openRejectModal(product.id)}
                    background="#f44336"
                    color="#fff"
                  >
                    Reject
                  </Button>
                </>
              )}

              {isVendor && product.vendorId === currentUser.id && (
                <>
                  <Button
                    onClick={() => handleEdit(product.id)}
                    background="#2196f3"
                    color="#fff"
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => openDeleteModal(product.id)}
                    background="#f44336"
                    color="#fff"
                  >
                    Remove
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showModal && (
        <Modal
          title="Confirm Deletion"
          message="Are you sure you want to delete this product?"
          onConfirm={confirmDelete}
          onCancel={closeModal}
          confirmText={deleting ? "Deleting..." : "Yes, Delete"}
        />
      )}

      {showApproveModal && (
        <Modal
          title="Confirm Approval"
          message="Are you sure you want to approve this product?"
          onConfirm={confirmApprove}
          onCancel={closeApproveModal}
          confirmText={approving ? "Approving..." : "Yes, Approve"}
        />
      )}

      {showRejectModal && (
        <Modal
          title="Confirm Rejection"
          message="Are you sure you want to reject this product?"
          onConfirm={confirmReject}
          onCancel={closeRejectModal}
          confirmText={rejecting ? "Rejecting..." : "Yes, Reject"}
        />
      )}
    </DashboardLayout>
  );
};

// Reusable Modal Component
const Modal = ({ title, message, onConfirm, onCancel, confirmText }) => (
  <div className="modal-overlay">
    <div className="modal">
      <h4>{title}</h4>
      <p>{message}</p>
      <div className="modal__actions">
        <Button onClick={onConfirm} background="#4caf50" color="#fff">
          {confirmText}
        </Button>
        <Button onClick={onCancel} background="#ccc" color="#000">
          Cancel
        </Button>
      </div>
    </div>
  </div>
);

export default AllProducts;
