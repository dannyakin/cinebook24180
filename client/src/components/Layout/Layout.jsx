import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="relative">
      <Header />
      <div className="pt-[65px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
