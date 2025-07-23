import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import ProductManagement from "./Components/ProductManagment/ProductManagment";
// import CheckAuthentication from "./Components/CheckAuthentication";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const onStorage = () => {
      setToken(localStorage.getItem("token") || "");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login setToken={setToken} />,
    },
    {
      path: "/",
      element: token ? (
        <ProductManagement token={token} setToken={setToken} />
      ) : (
        <Navigate to="/login" replace />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;