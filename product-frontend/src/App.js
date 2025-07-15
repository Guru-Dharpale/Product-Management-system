import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ProductManagement from "./ProductManagement";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  console.log("Current token value:", token); // <-- Add this line to check token
  useEffect(() => {
    const onStorage = () => {
      setToken(localStorage.getItem("token") || "");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/"
          element={
            token ? (
              <ProductManagement token={token} setToken={setToken} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
