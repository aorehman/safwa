import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotFound = () => {
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
        return "/login";
    }
  };

  const getRedirectPath = () => {
    if (!token) return "/login";

    return redirectTo(user?.role_id);
  };

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - The Page can't be found</h2>
        </div>
        {token ? (
          <Link to={getRedirectPath()}>Go To Dashboard</Link>
        ) : (
          <Link to={"/login"}>Go To Login</Link>
        )}
      </div>
    </div>
  );
};

export default NotFound;
