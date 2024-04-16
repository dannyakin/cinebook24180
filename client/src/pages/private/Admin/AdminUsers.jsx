import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSlide,
  deleteMovie,
  getAllMovies,
} from "../../../function/Redux/Movies/movieSlice";
import TableUi from "../../../components/Ui/Table";
import Loading from "../../../components/Ui/Loading";
import { Button, Popconfirm } from "antd"; // Import Button and Popconfirm components from Ant Design
import CreateMovie from "../../../components/Movie/CreateMovie";
import { getAllUsers } from "../../../function/Redux/User/UserSlice";

const AdminUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { users, status } = useSelector((state) => state.users);

  // Define custom action function
  const customAction = (record) => {
    // Your delete logic here
    console.log("Delete movie:", record);
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      filterType: "input",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "User Type",
      dataIndex: "userType",
      filterType: "select",
      options: [
        { label: "Admin", value: "admin", tag: "red" },
        { label: "Regular", value: "regular", tag: "green" },
      ],
    },
  ];
  const onRowClick = (record) => {};

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-between items-baseline">
        <div className="">
          <div className="text-green-600 font-bold text-[25px]">User List</div>
          <div className="">
            This is the list of all Users that are using the system
          </div>
        </div>
      </div>
      <div className="mt-5">
        {status === "loading" ? (
          <Loading />
        ) : (
          <div className="max-w-fulls max-h-fulls">
            <TableUi columns={columns} data={users} onRowClick={onRowClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUser;
