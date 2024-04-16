import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsPrinter } from "react-icons/bs";

const Ticket = () => {
  const dispatch = useDispatch();
  const { ticket, loading, error } = useSelector((state) => state.ticket);

  const handlePrint = () => {
    // Trigger the browser's print dialog
    window.print();
  };

  return (
    <div className="relative w-[400px] min-h-[300px] max-w-screen max-h-screen bg-white rounded-[15px] p-4">
      {loading ? (
        "Loading..."
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="relative">
          <div
            className="absolute top-3 right-3 text-orange-600"
            onClick={handlePrint}
          >
            <BsPrinter />
          </div>
          <div className="text-2xl font-extrabold">
            Cine<span className="text-orange-600">Booker </span>
          </div>{" "}
          <div className="mb-3">Ticket Id : {ticket.booking?._id} </div>
          <div className="grid grid-cols-2 gap-1 items-end">
            <div className="">
              <img
                src="https://res.cloudinary.com/dd6wbwlw9/image/upload/v1712877631/gabdaniel/wfkltgoureznzrc1otst.jpg"
                className="rounded-xl"
                alt=""
              />
            </div>
            <div className=" text-[12px]">
              <div className="">
                Movie : <span className="font-bold">{ticket.movie.title}</span>
              </div>
              <div className="">
                Location : <span>{ticket.booking?.location}</span>
              </div>
              <div className="">
                Time : <span>{ticket.booking?.time}</span>
              </div>
              <div className="">
                Price : <span>{ticket.booking?.amount}</span>
              </div>

              <div className="">
                Seat :{" "}
                <div className="grid grid-cols-4 gap-2 text-white">
                  {ticket.booking?.seat.map((s, i) => (
                    <div
                      className="bg-orange-600 h-6 w-10 text-[11px] flex items-center justify-center rounded"
                      key={i}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ticket;
