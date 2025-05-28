import React, { useEffect } from "react";
import { HashRouter, RouterProvider } from "react-router-dom";
import router from "./Routes/Router";
import "./Styles/main.scss";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./redux/reducers/user/userSlice";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  return <RouterProvider router={router} />;
};

export default App;
