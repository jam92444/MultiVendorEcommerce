import { createHashRouter } from "react-router-dom";
import Home from "../Screens/Home";
import Login from "../Screens/Auth/Login";

// Define your routes
const router = createHashRouter([
  // Public Routes
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  // { path: "/register", element: <Register /> },
  // { path: "/auth/forgot-password", element: <ForgotPassword /> },
  // { path: "/auth/reset-password/:token", element: <ResetPassword /> },
  // { path: "/products", element: <ProductList /> },
  // { path: "/product/:id", element: <ProductDetail /> },

  // Admin Private Routes
  // {
  //   path: "/admin/dashboard",
  //   element: <PrivateRoute allowedRoles={["admin"]} />,
  //   children: [
  //     { path: "/admin/dashboard", element: <AdminDashboard /> },
  //     { path: "/admin/users", element: <UserManagement /> },
  //     { path: "/admin/vendors", element: <VendorManagement /> },
  //     { path: "/admin/orders", element: <AdminOrders /> },
  //   ],
  // },

  // Vendor Private Routes
  // {
  //   path: "/vendor/dashboard",
  //   element: <PrivateRoute allowedRoles={["vendor"]} />,
  //   children: [
  //     { path: "/vendor/dashboard", element: <VendorDashboard /> },
  //     { path: "/vendor/products", element: <VendorProducts /> },
  //     { path: "/vendor/products/add", element: <AddProduct /> },
  //     { path: "/vendor/products/edit/:id", element: <EditProduct /> },
  //     { path: "/vendor/orders", element: <VendorOrders /> },
  //   ],
  // },

  // Customer Private Routes
  // {
  //   path: "/customer/dashboard",
  //   element: <PrivateRoute allowedRoles={["customer"]} />,
  //   children: [
  //     { path: "/customer/dashboard", element: <CustomerDashboard /> },
  //     { path: "/cart", element: <Cart /> },
  //     { path: "/checkout", element: <Checkout /> },
  //     { path: "/orders", element: <CustomerOrders /> },
  //     { path: "/orders/:id", element: <OrderDetails /> },
  //   ],
  // },
]);

export default router;


// 
// const router = createHashRouter([
//   // Public Routes
//   { path: "/", element: <Home /> },
//   { path: "/login", element: <CustomerLogin /> },
  // { path: "/admin/login", element: <AdminLogin /> },
  // { path: "/vendor/login", element: <VendorLogin /> },
  // { path: "/register", element: <Register /> },
  // { path: "/auth/forgot-password", element: <ForgotPassword /> },
  // { path: "/auth/reset-password/:token", element: <ResetPassword /> },
  // { path: "/products", element: <ProductList /> },
  // { path: "/product/:id", element: <ProductDetail /> },

  // Admin Private Routes
  // {
  //   path: "/admin/dashboard",
  //   element: <PrivateRoute allowedRoles={["admin"]} />,
  //   children: [
  //     { path: "/admin/dashboard", element: <AdminDashboard /> },
  //     { path: "/admin/users", element: <UserManagement /> },
  //     { path: "/admin/vendors", element: <VendorManagement /> },
  //     { path: "/admin/orders", element: <AdminOrders /> },
  //   ],
  // },

  // Vendor Private Routes
  // {
  //   path: "/vendor/dashboard",
  //   element: <PrivateRoute allowedRoles={["vendor"]} />,
  //   children: [
  //     { path: "/vendor/dashboard", element: <VendorDashboard /> },
  //     { path: "/vendor/products", element: <VendorProducts /> },
  //     { path: "/vendor/products/add", element: <AddProduct /> },
  //     { path: "/vendor/products/edit/:id", element: <EditProduct /> },
  //     { path: "/vendor/orders", element: <VendorOrders /> },
  //   ],
  // },

  // Customer Private Routes
  // {
  //   path: "/customer/dashboard",
  //   element: <PrivateRoute allowedRoles={["customer"]} />,
  //   children: [
  //     { path: "/customer/dashboard", element: <CustomerDashboard /> },
  //     { path: "/cart", element: <Cart /> },
  //     { path: "/checkout", element: <Checkout /> },
  //     { path: "/orders", element: <CustomerOrders /> },
  //     { path: "/orders/:id", element: <OrderDetails /> },
  //   ],
  // },
// ]);