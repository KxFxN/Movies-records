// PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, token } = useAuth();

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
