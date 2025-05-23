import React from "react";
import { HashRouter, RouterProvider } from "react-router-dom";
import router from "./Routes/Router";
import "./Styles/main.scss"
const App = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default App;
