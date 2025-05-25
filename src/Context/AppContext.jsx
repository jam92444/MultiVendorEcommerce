import { createContext, useEffect, useState } from "react";
import { getAllUsers } from "../services/admin/allUser";
import { useNavigate, useLocation } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUser, setAllUser] = useState([]); 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

useEffect(() => {
  if (!user) return;

  const routeMap = {
    admin: "#/admin/dashboard",
    vendor: "#/vendor/dashboard",
    user: "#/"
  };

  const targetPath = routeMap[user.role] || "/";
  if (window.location.pathname !== targetPath) {
    window.location.href = targetPath; // full page reload
  }
}, [user]);



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setAllUser(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    logout,
    allUser,
    setAllUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
