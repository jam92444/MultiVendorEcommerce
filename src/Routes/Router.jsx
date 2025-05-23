import { createHashRouter } from "react-router-dom";
import Home from "../Screens/Home";
import Login from "../Screens/Auth/Login";
import AdminDashboard from "../Screens/Home/Admin/AdminDashboard";
import VendorDashboard from "../Screens/Home/Vendor/VendorDashboard";
import PrivateRoute from "./PrivateROute";
import AddUser from "../Screens/Home/Admin/AddUser";
import VendorList from "../Screens/Home/Admin/VendorList";
import UserList from "../Screens/Home/Admin/UserList";
import Edit from "../Screens/Home/Admin/Edit";

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
  {
    path: "/admin/dashboard",
    element: <PrivateRoute allowedRoles={["admin"]} />,
    children: [
      { path: "", element: <AdminDashboard /> }, // index route
      { path: "addUser", element: <AddUser /> },
      { path: "all-users", element: <UserList /> },
      { path: "all-vendors", element: <VendorList /> },
      { path:"edit-vendor/:id", element:<Edit />},
      // { path: "orders", element: <AdminOrders /> },
    ],
  },

  // Vendor Private Routes
  {
    path: "/vendor/dashboard",
    element: <PrivateRoute allowedRoles={["vendor"]} />,
    children: [
      { path: "/vendor/dashboard", element: <VendorDashboard /> },
      // { path: "/vendor/products", element: <VendorProducts /> },
      // { path: "/vendor/products/add", element: <AddProduct /> },
      // { path: "/vendor/products/edit/:id", element: <EditProduct /> },
      // { path: "/vendor/orders", element: <VendorOrders /> },
    ],
  },

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
  {
    path:'*',
    element: <h1>404 Page Not Found</h1>
  }
]);

export default router;
