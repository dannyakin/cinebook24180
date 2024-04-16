import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableUi from "../../../components/Ui/Table";
import Loading from "../../../components/Ui/Loading";
import { fetchAllTickets } from "../../../function/Redux/Tickets/ticketSlice";

const AdminTicket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const { allTickets, status } = useSelector((state) => state.ticket);
console.log(allTickets);
  // Define custom action function

  const columns = [
    {
      title: "Ticket ID",
      dataIndex: "_id",
      filterType: "input",
    },
    {
      title: "Location",
      dataIndex: "location",
      filterType: "input",
    },
    {
      title: "Seat",
      dataIndex: "seat",
      filterType: "input",
    },
    {
      title: "time",
      dataIndex: "time",
      filterType: "input",
    },
    {
      title: "Showing Date",
      dataIndex: "showingDate",
      filterType: "input",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
  ];
  const onRowClick = (record) => {};

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-between items-baseline">
        <div className="">
          <div className="text-blue-600 font-bold text-[25px]">Ticket List</div>
          <div className="">
            This is the list of all the tickets booked by the users
          </div>
        </div>
      </div>
      <div className="mt-5">
        {status === "loading" ? (
          <Loading />
        ) : (
          <div className="max-w-fulls max-h-fulls">
            <TableUi
              columns={columns}
              data={allTickets}
              onRowClick={onRowClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTicket;
