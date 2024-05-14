import React, { useState } from "react";
import { getDataAPI } from "../../utils/api";
import { Link } from "react-router-dom";

const Search = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await getDataAPI(`api/search?search=${query}`);
      console.log(response);

      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="md:relative " style={{ zIndex: '999999999999999999'}}>
      <div
        onClick={() => setShowSearch(!showSearch)}
        className="flex border items-center justify-center rounded-full px-4 py-2 gap-2 bg-gray-200 cursor-pointer"
      >
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
        <div className="border-none text-gray-500 outline-none w-56 focus:outline-none hidden md:block bg-transparent text-sm">
          Search...
        </div>
      </div>
      {showSearch && (
        <div className="absolute right-[5%] w-[90vw] md:right-[0]  md:w-[400px] border bg-white h-[400px] mt-4 md:mt-2 rounded-xl shadow p-3 overflow-auto">
          <div>
            <form
              onSubmit={handleSearch}
              className="flex items-center justify-center gap-1"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie..."
                className="w-full border border-gray-200 px-3 py-1 rounded"
              />
              <button
                type="submit "
                className="bg-orange-500 text-white px-2 py-1 rounded font-light"
              >
                Search
              </button>
            </form>
            <ul>
              {loading
                ? "Loading...."
                : movies.map((movie, index) => (
                    <Link to={`/movie/${movie._id}`}>
                      <li
                        key={index}
                        className="mt-1 hover:bg-gray-200 rounded p-2  w-full cursor-pointer"
                      >
                        <div className="flex gap-2 items-center">
                          <img
                            src={movie?.image}
                            className="w-[30px] h-[30px] rounded-full"
                            alt=""
                          />
                          <div className="">
                            <div className="text-[12px] font-bold">
                              {movie?.title}
                            </div>
                            <div className="flex gap-3 text-gray-500">
                              {movie?.genres.map((item, i) => (
                                <div className="text-[12px]" key={i}>
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
