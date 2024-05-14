import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { clearAuthState } from "../../function/Redux/Auth/AuthSlice";
import Search from "./Search";

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const hanlderLoOut = () => {
    Cookies.remove("currentUser");
    Cookies.remove("token");
    dispatch(clearAuthState());
  };
  return (
    <div className="fixed top-0 left-0 w-screen  shadow bg-white  ">
      <div className="container mx-auto px-5 ">
        <div className="flex items-center justify-between  h-[60px]">
          {/* logo */}
          <div className="">
            <div className="text-2xl font-extrabold">
              <Link to="/">
                Cine<span className="text-orange-600">Booker 🇮🇪 </span>
              </Link>
            </div>
          </div>

          <Search />
          {/* links      */}
          <div className="flex gap-2 items-center justify-center text-[13px]">
            {/* <Link to="/">Home</Link> */}
            {currentUser ? (
              currentUser.userType === "admin" ? (
                <>
                  {" "}
                  <Link to="admin/">Dashboard</Link>
                  <Link to="admin/movies">Movies</Link>
                  <Link to="admin/users">Users</Link>
                  <Link to="admin/ticket">Tickets</Link>
                  <div
                    className=" cursor-pointer "
                    onClick={() => hanlderLoOut()}
                  >
                    Log Out
                  </div>
                </>
              ) : (
                <>
                  <Link to="/dashboard">Tickets</Link>
                  <div
                    className=" cursor-pointer "
                    onClick={() => hanlderLoOut()}
                  >
                    Log Out
                  </div>
                </>
              )
            ) : (
              <>
                <Link to="/login">Sign In</Link>
                <Link to="/register">Join Us</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
