import React from "react";
import { useAuth } from "../../Contexts/AuthProvider/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import TopBar from "../NewTopBar";
import Login from "../../Pages/Login";

const ProtectedLayout = () => {
  const auth = useAuth();

  if (!auth.email) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
