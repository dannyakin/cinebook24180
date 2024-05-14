import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTickets } from "../../../function/Redux/Tickets/ticketSlice";
import { BsPrinter } from "react-icons/bs";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { userTickets, loading } = useSelector((state) => state.ticket);
  useEffect(() => {
    dispatch(fetchUserTickets());
  }, [dispatch]);
  const { currentUser } = useSelector((state) => state.auth);
  console.log(userTickets);
  const handlePrint = () => {
    // Trigger the browser's print dialog
    window.print();
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="text-2xl text-orange-600 capitalize">
        {" "}
        <span className="font-light text-black">Welcome</span>{" "}
        {currentUser.fullName}
      </div>
      <div className="mt-1">These are the list of movies you booked tickets for.</div>

      <div className="mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {loading
            ? "Loading..."
            : userTickets.length > 0
            ? userTickets.map((ticket, i) => (
                <Link to={`/movie/${ticket.movie._id}`}>
                  <div className="w-full shadow mt-5 bg-white rounded-xl overflow-hidden">
                    <div className="h-[100px] w-full">
                      <img
                        src={ticket?.movie?.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <div className="mt-1">{ticket.movie.title} </div>
                      <div className="font-bold text-orange-600">
                        {ticket._id}
                      </div>
                      <div className="">
                        {" "}
                        <b>Loaction: </b>
                        {ticket?.location}
                      </div>
                      <div className="">
                        {" "}
                        <b> Time:</b> {ticket?.time}
                      </div>
                      <div className="">
                        <b>Price: </b> {ticket?.amount}
                      </div>
                      <div className="grid grid-cols-5 gap-1 text-white mt-4">
                        {ticket.seat.map((s, i) => (
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
                </Link>
              ))
            : <div className="text-gray-400 text-center md:text-left mt-20 md:mt-0">You dont have any ticket yet"</div> }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
