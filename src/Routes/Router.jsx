import { createHashRouter } from "react-router-dom";
import Home from "../Screens/Home";
import Login from "../Screens/Auth/Login";
import AdminDashboard from "../Screens/Home/Admin/AdminDashboard";
import VendorDashboard from "../Screens/Home/Vendor/VendorDashboard";
import PrivateRoute from "./PrivateRoute";
import AddUser from "../Screens/Home/Admin/AddUser";
import VendorList from "../Screens/Home/Admin/VendorList";
import UserList from "../Screens/Home/Admin/UserList";
import Edit from "../Screens/Home/Admin/Edit";
import AddProduct from "../Screens/Home/Vendor/AddProduct";
import AllOrders from "../Screens/Home/Vendor/AllOrders";
import NewOrders from "../Screens/Home/Vendor/NewOrders";
import AllProducts from "../Screens/Home/Vendor/AllProducts";
import Product from "../Screens/Home/User/Product";
import ProductDetail from "../Screens/Home/User/ProductDetail";
import CartPage from "../Screens/Home/User/CartPage";
import OrderConfirmation from "../Components/OrderConfirmation";
import CheckOut from "../Components/ProceedToOrder";
import PaymentPage from "../Screens/Home/User/PaymentPage";
import OrdersPage from "../Screens/Home/User/OrdersPage";
// Define your routes
const router = createHashRouter([
  // Public Routes
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/products", element: <Product /> },
  { path: "/products/:productId", element: <ProductDetail /> },

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
      { path:"all-products", element:<AllProducts />},
      // { path: "orders", element: <AdminOrders /> },
    ],
  },

  // Vendor Private Routes
  {
    path: "/vendor/dashboard",
    element: <PrivateRoute allowedRoles={["vendor"]} />,
    children: [
      { path: "", element: <VendorDashboard /> },
      { path: "add-products", element: <AddProduct /> },
      { path: "all-products", element: <AllProducts /> },
      { path: "all-orders", element: <AllOrders /> },
      { path: "new-orders", element: <NewOrders /> },
      
      
    ],
  },

  // Customer Private Routes
  {
    path: "",
    element: <PrivateRoute allowedRoles={["user"]} />,
    children: [
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckOut /> },
      { path: "/payment", element: <PaymentPage /> },
      { path: "/order-confirmation", element: <OrderConfirmation /> },

      { path: "/orders", element: <OrdersPage /> },
      // { path: "/orders/:id", element: <OrderDetails /> },
    ],
  },
  {
    path:'*',
    element: <h1>404 Page Not Found</h1>
  }
]);

export default router;
