import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectiveRoute({ allowedRole }) {
  const position = localStorage.getItem("position"); // Get the user role from localStorage

  if (!position) {
    // If no role is found, redirect to login
    return <Navigate to="/login" />;
  }
  if (position !== allowedRole) {
    // If the user's role doesn't match, redirect them to login or a forbidden page
    return <Navigate to="/login" />;
  }

  // If everything checks out, render the child routes
  return <Outlet />;
}

export default ProtectiveRoute;
