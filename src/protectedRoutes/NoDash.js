import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
function NoDashRoute() {
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
      default:
        return "/not-authorized";
    }
  };

  const getRedirectPath = () => {
    if (!token) return "/login";
    return redirectTo(user?.role_id);
  };
  return user?.role_id == 1 ||
    user?.role_id == 2 ||
    user?.role_id == 3 ||
    user?.role_id == 6 ||
    user.role_id == 8 ||
    user.role_id == 10 ? (
    <Navigate to={getRedirectPath()} />
  ) : (
    <Outlet />
  );
}

export default NoDashRoute;
