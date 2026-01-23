// src/components/organisms/ProtectedRoute.tsx

import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import Menu from "../menu"; // Adjust path to where your Menu component is

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if current route is login
  const hideMenuPaths = ["/login"];
  const shouldHideMenu = hideMenuPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideMenu && <Menu />}
      <main style={{ flex: 1 }}>{children}</main>
    </>
  );
};

export default ProtectedRoute;
