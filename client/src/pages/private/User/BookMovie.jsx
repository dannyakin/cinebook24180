import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { IoTimeSharp } from "react-icons/io5";
import { fetchMovies } from "../../../function/Redux/Movies/movieSlice";
import Seat from "../../../components/Movie/Seat";
import Payment from "../../../components/Payment/Payment";
import { createTicket } from "../../../function/Redux/Tickets/ticketSlice";
import Ticket from "./Ticket";

const BookMovie = () => {
  const dispatch = useDispatch();
  const { movie, error, loading } = useSelector((state) => state.movie);
  const { movieId } = useParams();
  const [time, setTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [showingDate, setShowingshowingDate] = useState(null);
  const [seat, setSeat] = useState([]);
  const [amount, setAmount] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showTicket, setShowTicket] = useState(false);

  const [makePayment, setMakePayment] = useState(false);

console.log(movieId);
  useEffect(() => {
    dispatch(fetchMovies(movieId));
  }, [dispatch]);

  useEffect(() => {
    setAmount(12 * seat.length);
  }, [seat]);

  const handlePay = () => {
    const ticketData = {
      location: location,
      seat: seat,
      time: time,
      amount: amount,
      movieId: movieId,
      showingDate: showingDate,
    };
    setShowTicket(true);
    dispatch(createTicket(ticketData));
  };

  console.log(movie)

  return (
    <div className="mt-4">
      {loading ? (
        "Loading"
      ) : (
        <div className="">
          <div className="">
            <div className="container mx-auto">
              <div className="flex gap-4  items-end">
                <img
                  src={movie?.image}
                  className="w-[200px] h-[280px] object-cover rounded"
                  alt=""
                />
                <div className="">
                  <div className="uppercase text-orange-600 text-4xl font-extrabold">
                    {movie?.title}
                  </div>
                  <div className="text-gray-500 w-[700px] max-w-full text-[14px]">
                    {movie?.description}
                  </div>
                  <div className="flex gap-3">
                    {movie?.genres.map((item, i) => (
                      <div className="text-[12px]" key={i}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-1 items-center">
                      <img
                        src="/assets/images/imdb.png"
                        alt=""
                        className="w-[60px]"
                      />
                      <div className="text-white text-xs"> </div>
                    </div>
                    <div className="flex items-center text-orange-600 gap-1">
                      <IoTimeSharp />
                      <div className="text-black text-xs">
                        {moment(movie?.releaseDate).format("MMMM D, YYYY")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* details\ */}
            <div className="container mx-auto mt-5">
              <div className="w-full grid grid-cols-1  md:grid-cols-2 p-5 rounded-xl bg-slate-200 flex items-center">
                <div className="flex items-center gap-3">
                  <div className="">Data</div>
                  <div className="flex overflow-auto gap-4">
                    <div className="grid grid-cols-5 md:grid-cols-3 gap-2 mt-2">
                      {movie?.showingDate &&
                        movie.showingDate.map((item, i) => (
                          <div
                            onClick={() => setShowingshowingDate(item)}
                            className={`p-2  rounded text-[12px]  text-white  cursor-pointer ${
                              showingDate === item
                                ? "bg-orange-600"
                                : " bg-slate-800"
                            }`}
                            key={i}
                          >
                            {item}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-cols md:flex-row gap-3">
                  <div className="">
                    <div className="">Time and Format</div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {movie?.time &&
                        movie.time.map((item, i) => (
                          <div
                            onClick={() => setTime(item)}
                            className={`p-2 rounded text-[10px] text-white  cursor-pointer ${
                              time === item ? "bg-orange-600" : "bg-gray-500"
                            }`}
                            key={i}
                          >
                            {item}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="">
                    <div className="">Location</div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {movie?.locations &&
                        movie.locations.map((item, i) => (
                          <div
                            onClick={() => setLocation(item)}
                            className={`p-2 rounded text-[10px] text-white  cursor-pointer ${
                              location === item
                                ? "bg-orange-600"
                                : "bg-gray-500"
                            }`}
                            key={i}
                          >
                            {item}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" bg-slate-900 text-white w-full py-16 rounded-xl mt-5 shadow mb-10">
              <div className="container mx-auto">
                <div className="grid grid-cols-2 items-center justify-center">
                  <div className="grid-cols-2">
                    {/* Seat */}
                    <div className="">
                      <svg
                        width="100%"
                        height="34"
                        viewBox="0 0 904 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 32C364.592 -8.60106 561.318 -7.39439 902 32"
                          stroke="white"
                          stroke-width="3"
                          stroke-linecap="round"
                        />
                      </svg>

                      <div className="grid grid-cols-11 gap-4 mt-5">
                        <div className=""></div>{" "}
                        {/* Placeholder for the first column */}
                        {[...Array(10).keys()].map((index) => (
                          <div
                            className=" text-center font-extrabold"
                            key={index}
                          >
                            {index + 1}
                          </div>
                        ))}
                        {movie?.seat &&
                          movie.seat.map((item, i) => (
                            <>
                              <div
                                className={`p-2 rounded text-[10px]cursor-pointer font-extrabold text-orange-600`}
                                key={i}
                              >
                                {item.section}
                              </div>
                              {item.seats.map((s, i) => (
                                <div key={i}>
                                  <Seat
                                    id={s.id}
                                    status={s.status}
                                    seat={seat}
                                    setSeat={setSeat}
                                  />
                                </div>
                              ))}
                            </>
                          ))}
                      </div>
                      <div className="flex gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <svg
                            width="30"
                            height="25"
                            viewBox="0 0 30 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.60478 24.5694C5.22815 24.5694 4.91266 24.4418 4.65832 24.1866C4.40398 23.9314 4.27637 23.6159 4.27549 23.2401V21.9108C3.16774 21.9108 2.22615 21.5231 1.45073 20.7477C0.675309 19.9723 0.287598 19.0307 0.287598 17.9229V11.2765C0.287598 10.5453 0.54814 9.91969 1.06922 9.39949C1.59031 8.87929 2.21596 8.61875 2.94619 8.61787C3.6773 8.61787 4.3034 8.87841 4.82448 9.39949C5.34557 9.92058 5.60567 10.5462 5.60478 11.2765V16.5936H24.2149V11.2765C24.2149 10.5453 24.4755 9.91969 24.9966 9.39949C25.5176 8.87929 26.1433 8.61875 26.8735 8.61787C27.6046 8.61787 28.2307 8.87841 28.7518 9.39949C29.2729 9.92058 29.533 10.5462 29.5321 11.2765V17.9229C29.5321 19.0307 29.1444 19.9723 28.369 20.7477C27.5936 21.5231 26.652 21.9108 25.5442 21.9108V23.2401C25.5442 23.6168 25.4166 23.9327 25.1614 24.1879C24.9062 24.4431 24.5907 24.5703 24.2149 24.5694C23.8383 24.5694 23.5228 24.4418 23.2685 24.1866C23.0141 23.9314 22.8865 23.6159 22.8856 23.2401V21.9108H6.93408V23.2401C6.93408 23.6168 6.80646 23.9327 6.55124 24.1879C6.29601 24.4431 5.98053 24.5703 5.60478 24.5694ZM8.26337 13.935V11.2765C8.26337 10.0579 7.8925 8.96658 7.15075 8.0024C6.40901 7.03822 5.45058 6.35718 4.27549 5.95927V4.62998C4.27549 3.52223 4.6632 2.58065 5.43862 1.80522C6.21404 1.0298 7.15563 0.64209 8.26337 0.64209H21.5563C22.6641 0.64209 23.6057 1.0298 24.3811 1.80522C25.1565 2.58065 25.5442 3.52223 25.5442 4.62998V5.95927C24.3479 6.26944 23.3841 6.9177 22.653 7.90403C21.9219 8.89037 21.5563 10.0145 21.5563 11.2765V13.935H8.26337Z"
                              fill="white"
                            />
                          </svg>
                          <div className="text-[12px]">Available</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg
                            width="30"
                            height="25"
                            viewBox="0 0 30 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.60478 24.5694C5.22815 24.5694 4.91266 24.4418 4.65832 24.1866C4.40398 23.9314 4.27637 23.6159 4.27549 23.2401V21.9108C3.16774 21.9108 2.22615 21.5231 1.45073 20.7477C0.675309 19.9723 0.287598 19.0307 0.287598 17.9229V11.2765C0.287598 10.5453 0.54814 9.91969 1.06922 9.39949C1.59031 8.87929 2.21596 8.61875 2.94619 8.61787C3.6773 8.61787 4.3034 8.87841 4.82448 9.39949C5.34557 9.92058 5.60567 10.5462 5.60478 11.2765V16.5936H24.2149V11.2765C24.2149 10.5453 24.4755 9.91969 24.9966 9.39949C25.5176 8.87929 26.1433 8.61875 26.8735 8.61787C27.6046 8.61787 28.2307 8.87841 28.7518 9.39949C29.2729 9.92058 29.533 10.5462 29.5321 11.2765V17.9229C29.5321 19.0307 29.1444 19.9723 28.369 20.7477C27.5936 21.5231 26.652 21.9108 25.5442 21.9108V23.2401C25.5442 23.6168 25.4166 23.9327 25.1614 24.1879C24.9062 24.4431 24.5907 24.5703 24.2149 24.5694C23.8383 24.5694 23.5228 24.4418 23.2685 24.1866C23.0141 23.9314 22.8865 23.6159 22.8856 23.2401V21.9108H6.93408V23.2401C6.93408 23.6168 6.80646 23.9327 6.55124 24.1879C6.29601 24.4431 5.98053 24.5703 5.60478 24.5694ZM8.26337 13.935V11.2765C8.26337 10.0579 7.8925 8.96658 7.15075 8.0024C6.40901 7.03822 5.45058 6.35718 4.27549 5.95927V4.62998C4.27549 3.52223 4.6632 2.58065 5.43862 1.80522C6.21404 1.0298 7.15563 0.64209 8.26337 0.64209H21.5563C22.6641 0.64209 23.6057 1.0298 24.3811 1.80522C25.1565 2.58065 25.5442 3.52223 25.5442 4.62998V5.95927C24.3479 6.26944 23.3841 6.9177 22.653 7.90403C21.9219 8.89037 21.5563 10.0145 21.5563 11.2765V13.935H8.26337Z"
                              fill="gray"
                            />
                          </svg>
                          <div className="text-[12px]">Unavailable</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg
                            width="30"
                            height="25"
                            viewBox="0 0 30 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.60478 24.5694C5.22815 24.5694 4.91266 24.4418 4.65832 24.1866C4.40398 23.9314 4.27637 23.6159 4.27549 23.2401V21.9108C3.16774 21.9108 2.22615 21.5231 1.45073 20.7477C0.675309 19.9723 0.287598 19.0307 0.287598 17.9229V11.2765C0.287598 10.5453 0.54814 9.91969 1.06922 9.39949C1.59031 8.87929 2.21596 8.61875 2.94619 8.61787C3.6773 8.61787 4.3034 8.87841 4.82448 9.39949C5.34557 9.92058 5.60567 10.5462 5.60478 11.2765V16.5936H24.2149V11.2765C24.2149 10.5453 24.4755 9.91969 24.9966 9.39949C25.5176 8.87929 26.1433 8.61875 26.8735 8.61787C27.6046 8.61787 28.2307 8.87841 28.7518 9.39949C29.2729 9.92058 29.533 10.5462 29.5321 11.2765V17.9229C29.5321 19.0307 29.1444 19.9723 28.369 20.7477C27.5936 21.5231 26.652 21.9108 25.5442 21.9108V23.2401C25.5442 23.6168 25.4166 23.9327 25.1614 24.1879C24.9062 24.4431 24.5907 24.5703 24.2149 24.5694C23.8383 24.5694 23.5228 24.4418 23.2685 24.1866C23.0141 23.9314 22.8865 23.6159 22.8856 23.2401V21.9108H6.93408V23.2401C6.93408 23.6168 6.80646 23.9327 6.55124 24.1879C6.29601 24.4431 5.98053 24.5703 5.60478 24.5694ZM8.26337 13.935V11.2765C8.26337 10.0579 7.8925 8.96658 7.15075 8.0024C6.40901 7.03822 5.45058 6.35718 4.27549 5.95927V4.62998C4.27549 3.52223 4.6632 2.58065 5.43862 1.80522C6.21404 1.0298 7.15563 0.64209 8.26337 0.64209H21.5563C22.6641 0.64209 23.6057 1.0298 24.3811 1.80522C25.1565 2.58065 25.5442 3.52223 25.5442 4.62998V5.95927C24.3479 6.26944 23.3841 6.9177 22.653 7.90403C21.9219 8.89037 21.5563 10.0145 21.5563 11.2765V13.935H8.26337Z"
                              fill="#FF6D18"
                            />
                          </svg>
                          <div className="text-[12px]">Selected</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-[40px] mb-4 font-bold">Summary</div>

                    <div className="flex mb-3 items-center gap-1 justify-between">
                      <div className="text-[16px] font-bold">Cinema:</div>
                      <div className="">{location}</div>
                    </div>
                    <div className="flex mb-3 items-center gap-1 justify-between">
                      <div className="text-[16px] font-bold">Date Time:</div>
                      <div className="">{time}</div>
                    </div>

                    <div className="grid grid-cols-2 items-center gap-1 justify-between">
                      <div className="text-[16px] font-bold text-gray-500">
                        Seats Selected
                      </div>
                      <div className="grid grid-cols-5 gao-1">
                        {seat.map((se, index) => (
                          <div
                            className="text-white bg-orange-600 text-[13px] rounded w-10 h-10 flex items-center justify-center"
                            key={index}
                          >
                            {se}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex mb-3 items-center gap-1 justify-between">
                      <div className="text-[16px] font-bold">Price:</div>
                      <div className="">€{amount}</div>
                    </div>
                    <small className="text-red-600">{errorMsg}</small>
                    <button
                      className="w-[100%] mt-5 bg-orange-600 rounded text-white text-center p-2"
                      onClick={() => {
                        if (!location || !seat || !time) {
                          setErrorMsg("Please pick your prefence ");
                        } else {
                          setErrorMsg(null);
                          setMakePayment(true);
                        }
                      }}
                    >
                      Proceed to payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {makePayment && (
        <div className="fixed top-0 lef-0 bg-gray-950 flex items-center justify-center w-screen h-screen">
          <Payment
            amount={amount}
            setMakePayment={setMakePayment}
            handlePay={handlePay}
          />
        </div>
      )}
      {showTicket && (
        <div className="fixed top-0 lef-0 bg-gray-950 flex items-center justify-center w-screen h-screen">
          <Ticket />
        </div>
      )}
    </div>
  );
};

export default BookMovie;
