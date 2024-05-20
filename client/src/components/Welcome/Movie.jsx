import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import moment from "moment";
const Movie = ({ movies, status, error }) => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto mt-5 mb-5">
      <div className="text-orange-600 text-3xl px-2">Movie To watch</div>
      <div className="text-gray-500 text-xs px-2">
        This are the list of available movies you can watch with us
      </div>
      {error && <div className="text-red-500 text-[14px]">{error}</div>}
      {status === "loading" && <div className="">Loading... </div>}
      <div className="flex overflow-auto gap-4 mt-3">
        {movies.map((movie) => (
          <div
            key={movie._id} // Add key prop for each movie
            className="relative cursor-pointer"
            onClick={() => navigate(`/movie/${movie._id}`)} // Use navigate function for navigation
          >
            <div className="absolute top-2 right-2 bg-orange-600 p-1 rounded text-[6px] text-white">
              {moment(movie.releaseDate).format("MMMM D, YYYY")}
            </div>
            <div className="w-[200px] h-[280px]">
              <img
                src={movie.image}
                className="w-full h-full rounded object-cover"
                alt=""
              />
            </div>
            <div className="">
              <div className="text-[14] w-full overflow-ellipsis">
                {movie.title}
              </div>
              <div className="text-gray-500 text-[10px] flex gap-1">
                {movie.genres.map((item, i) => (
                  <div key={i} className="text-[10px]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mx-5 py-5 text-gray-400 text-[12px]">
        Project was developed by Daniel Gbenle with student id: 24180.
      </div>
    </div>
  );
};

export default Movie;
