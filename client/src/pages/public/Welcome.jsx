import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Ui/Loading";
import { getAllMovies } from "../../function/Redux/Movies/movieSlice";
import Slide from "../../components/Welcome/Slide";
import Movie from "../../components/Welcome/Movie";

const Welcome = ({data}) => {
  const { movies, status, error } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);
 const filteredData = movies.filter(item => item.slide === true);

  return (
    <div>
      {status === "loading" ? (
        <Loading />
      ) : (
        <div className="max-w-screen max-h-screen">
         <Slide data={filteredData} />
          <Movie movies={movies} loading={status} error={error} />
        </div>
      )}
    </div>
  );
};

export default Welcome;
