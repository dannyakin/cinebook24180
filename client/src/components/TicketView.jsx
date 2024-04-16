import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const TicketView = ({ userTickets }) => {
  const dispatch = useDispatch;
  useEffect(() => {}, [dispatch]);
  return (
    <div className="w-full shadow bg-white rounded">
      <div className="h-[100px] w-full">
        <img src={userTickets} alt="" />
      </div>
    </div>
  );
};

export default TicketView;
