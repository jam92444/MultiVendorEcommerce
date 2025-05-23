import { createContext, useEffect, useState } from "react";
import { getAllUsers } from "../services/admin/allUser"; // adjust path if needed

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
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setAllUser(data);
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
    setAllUser, // include this if you want to update it elsewhere
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
