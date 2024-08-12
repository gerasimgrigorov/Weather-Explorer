import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const ProtectedRoute = () => {
  const { user } = useUser();
  console.log(user)

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
