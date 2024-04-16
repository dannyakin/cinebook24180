import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Admin = () => {
  const { currentUser } = useSelector((state) => state.auth);
  if (currentUser === null) return "Loading....";
  return (
    <>
      {" "}
      {currentUser.userType === "admin" ? (
        <Outlet />
      ) : (
        <div className="w-screen h-full flex text-cemter items-center justify-normal text-[30px] font-bold text-orange-600">
          <div className="text-center">
            {" "}
            You dont have permission to view this page
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
