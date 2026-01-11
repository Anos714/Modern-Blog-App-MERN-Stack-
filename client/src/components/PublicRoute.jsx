import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useSelector((state) => state.user);

  if (loading) return <Loader />;
  if (currentUser) return <Navigate to="/" />;
  return children;
};

export default PublicRoute;
