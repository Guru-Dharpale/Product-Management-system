import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckAuthentication = ({ children }) => {
  const isAuthenticated = false; // Replace with your real auth logic
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
};

export default CheckAuthentication;
