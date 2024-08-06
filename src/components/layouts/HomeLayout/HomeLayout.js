import React from "react";
import Navbar from "../../LandingPage/navbar";
import { Outlet } from "react-router-dom";
function HomeLayout() {
  return (
    <div className=" h-screen overflow-auto">
      <div className="">
        <Navbar />
      </div>
      <div className="mt-20 ">
        <Outlet />
      </div>
    </div>
  );
}

export default HomeLayout;
