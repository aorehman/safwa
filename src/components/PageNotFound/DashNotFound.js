import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../store/AsyncMethod/AuthMethod";
import { useDispatch } from "react-redux";

function DashNotFound() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>You Are Not Authorized</h2>
        </div>

        <Link
          onClick={() =>
            dispatch(userLogout()).then((success) => {
              if (success) {
                navigate("/login")
              }
            })
          }
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default DashNotFound;
