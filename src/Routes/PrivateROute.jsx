// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Or use context/auth provider
  if (!user) return <Navigate to="/login" />;

  return allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
