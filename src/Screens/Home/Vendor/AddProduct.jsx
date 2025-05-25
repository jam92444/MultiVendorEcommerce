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
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Approval modal state
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedApproveProductId, setSelectedApproveProductId] = useState(null);
  const [approving, setApproving] = useState(false);

  // Reject modal state
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

      let filteredProducts = productData;

      if (isVendor) {
        filteredProducts = productData.filter(
          (p) => p.vendorId === currentUser.id
        );
      }

      setProducts(filteredProducts);

      if (isAdmin) {
        const userData = await getAllUsers();
        if (Array.isArray(userData)) {
          const userMap = {};
          userData.forEach((user) => {
            userMap[user.id] = user.name;
          });
          setUsers(userMap);
        } else {
          console.error("Invalid user data:", userData);
        }
      }
    };

    fetchData();
  }, [isAdmin, isVendor, currentUser?.id]);

  const handleEdit = (id) => {
    console.log("Edit product with ID:", id);
  };

  // Delete modal handlers
  const openDeleteModal = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedProductId(null);
    setShowModal(false);
  };
  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(selectedProductId);
      setProducts((prev) =>
        prev.filter((product) => product.id !== selectedProductId)
      );
      closeModal();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete the product. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  // Approval modal handlers
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
      const productToUpdate = products.find(
        (p) => p.id === selectedApproveProductId
      );
      if (!productToUpdate) {
        throw new Error("Product not found");
      }

      // PATCH product: approved = true, rejected = false
      await approveProduct(selectedApproveProductId, {
        ...productToUpdate,
        approved: true,
        rejected: false,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedApproveProductId
            ? { ...p, approved: true, rejected: false }
            : p
        )
      );
      closeApproveModal();
    } catch (error) {
      console.error("Approval failed:", error);
      alert("Failed to approve the product. Please try again.");
    } finally {
      setApproving(false);
    }
  };

  // Reject modal handlers
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
      const productToUpdate = products.find(
        (p) => p.id === selectedRejectProductId
      );
      if (!productToUpdate) {
        throw new Error("Product not found");
      }

      // PATCH product: rejected = true, approved = false
      await rejectProduct(selectedRejectProductId, {
        ...productToUpdate,
        approved: false,
        rejected: true,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedRejectProductId
            ? { ...p, approved: false, rejected: true }
            : p
        )
      );
      closeRejectModal();
    } catch (error) {
      console.error("Rejection failed:", error);
      alert("Failed to reject the product. Please try again.");
    } finally {
      setRejecting(false);
    }
  };

  const formatDateTime = (isoDate) => {
    return new Date(isoDate).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
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
        {products.map((product) => {
          // Show all for admin, only approved for vendor
          const showProduct = isAdmin || product.approved;
          if (!showProduct) return null;

          return (
            <div key={product.id} className="all-products__row">
              <div className="all-products__image">
                <img src={product.images?.[0]} alt={product.name} />
              </div>
              <span>{product.name}</span>
              <span>${product.price}</span>
              {isAdmin && (
                <span>
                  {users[product.vendorId || product.userId] || "Loading..."}
                </span>
              )}

              <span>
                {product.approved ? (
                  <span className="status-approved">Approved</span>
                ) : product.rejected ? (
                  <span className="status-rejected">Rejected</span>
                ) : (
                  <span className="status-pending">Pending Approval</span>
                )}
              </span>

              <span>{formatDateTime(product.createdAt)}</span>

              <div className="all-products__actions">
                {isAdmin && !product.approved && !product.rejected && (
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
                {isVendor && (
                  <>
                    <Button
                      className="btn-edit"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn-remove"
                      onClick={() => openDeleteModal(product.id)}
                    >
                      Remove
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Confirm Deletion</h4>
            <p>Are you sure you want to delete this product?</p>
            <div className="modal__actions">
              <Button
                onClick={confirmDelete}
                background="#f44336"
                color="#fff"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </Button>
              <Button
                onClick={closeModal}
                background="#ccc"
                color="#000"
                disabled={deleting}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Confirmation Modal */}
      {showApproveModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Confirm Approval</h4>
            <p>Are you sure you want to approve this product?</p>
            <div className="modal__actions">
              <Button
                onClick={confirmApprove}
                background="#4caf50"
                color="#fff"
                disabled={approving}
              >
                {approving ? "Approving..." : "Yes, Approve"}
              </Button>
              <Button
                onClick={closeApproveModal}
                background="#ccc"
                color="#000"
                disabled={approving}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {showRejectModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Confirm Rejection</h4>
            <p>Are you sure you want to reject this product?</p>
            <div className="modal__actions">
              <Button
                onClick={confirmReject}
                background="#f44336"
                color="#fff"
                disabled={rejecting}
              >
                {rejecting ? "Rejecting..." : "Yes, Reject"}
              </Button>
              <Button
                onClick={closeRejectModal}
                background="#ccc"
                color="#000"
                disabled={rejecting}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AllProducts;
