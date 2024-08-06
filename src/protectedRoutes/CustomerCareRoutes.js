import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
function CustomerCareRoutes() {
  const { token, user } = useSelector((state) => state.AuthReducer);

  const redirectTo = (role_id) => {
    switch (parseInt(role_id)) {
      case 1:
        return "/admin/dashboard";
      case 2:
        return "/client/dashboard";
      case 3:
        return "/client/dashboard";
      case 6:
        return "/cashier/dashboard";
      case 10:
        return "/keeper/dashboard";
      default:
        return "/not-authorized";
    }
  };

  const getRedirectPath = () => {
    if (!token) return "/login";
    return redirectTo(user?.role_id);
  };
  return user?.role_id == 8 ? <Outlet /> : <Navigate to={getRedirectPath()} />;
}

export default CustomerCareRoutes;
