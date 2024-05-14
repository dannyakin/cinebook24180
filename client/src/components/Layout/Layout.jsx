import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="relative">
      <div style={{ zIndex: 99999999999999 }}>
        <Header />
      </div>
      <div className="pt-[65px]" style={{ zIndex: 2 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
