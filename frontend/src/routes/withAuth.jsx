import React from "react";
import { Navigate } from "react-router-dom";

const withAuth = (Component) => {
  const AuthRoute = () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      // If the user is not logged in, redirect to the login page
      return <Navigate to="/login" />;
    }

    // If the user is logged in, render the protected component
    return <Component />;
  };

  return AuthRoute;
};

export default withAuth;
