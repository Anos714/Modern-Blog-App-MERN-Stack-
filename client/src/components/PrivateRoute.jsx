import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Dashboard /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
