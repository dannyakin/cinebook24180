import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const hanlderLoOut = () => {
    Cookies.remove("currentUser");
    Cookies.remove("token");
  
  };
  return (
    <div className="fixed top-0 left-0 w-screen  shadow bg-white  ">
      <div className="container mx-auto px-5 ">
        <div className="flex items-center justify-between  h-[60px]">
          {/* logo */}
          <div className="">
            <div className="text-2xl font-extrabold">
              Cine<span className="text-orange-600">Booker 🇮🇪 </span>
            </div>
          </div>

          <div className="flex border items-center justify-center rounded-full px-4 py-2 gap-2 bg-gray-200">
            <div className="">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.79167 13.4583C10.9213 13.4583 13.4583 10.9213 13.4583 7.79167C13.4583 4.66205 10.9213 2.125 7.79167 2.125C4.66205 2.125 2.125 4.66205 2.125 7.79167C2.125 10.9213 4.66205 13.4583 7.79167 13.4583Z"
                  stroke="#5F5F5F"
                  stroke-width="1.41667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.8751 14.875L11.7938 11.7937"
                  stroke="#5F5F5F"
                  stroke-width="1.41667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="What is on your mind"
              className="border-none outline-none w-56 focus:outline-none hidden md:block bg-transparent text-sm"
            />
          </div>
          {/* links      */}
          <div className="flex gap-2 items-center justify-center">
            <Link to="/">Home</Link>
            {currentUser ? (
              currentUser.userType === "admin" ? (
                <>
             
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
                  <Link to="">Tickets</Link>
                  <div
                    className=" cursor-pointer "
                    onClick={() => hanlderLoOut()}
                  >
                    Log Out
                  </div>
                </>
              )
            ) : (
              <Link to="login">Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
