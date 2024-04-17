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

const AdminMovie = () => {
  const [showAction, setShowAction] = useState(false);
  const [clickedRaw, setClikedRaw] = useState(null);
  const [create, setCreate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  const { movies, status } = useSelector((state) => state.movie);

  // Define custom action function
  const customAction = (record) => {
    // Your delete logic here
    console.log("Delete movie:", record);
  };

  const columns = [
    {
      title: "Movie Title",
      dataIndex: "title",
      filterType: "input",
    },
    {
      title: "Details",
      dataIndex: "description",
    },
    {
      title: "Genres",
      dataIndex: "genres",
      filterType: "select",
      options: [
        { label: "Drama", value: "Customer", tag: "blue" },
        { label: "Comedy", value: "Comedy", tag: "green" },
        { label: "Action", value: "Action", tag: "red" },
      ],
    },
    {
      title: "Locations",
      dataIndex: "locations",
      filterType: "input",
    },
    {
      title: "ReleaseDate",
      dataIndex: "releaseDate",
    },
    {
      title: "Showing Date",
      dataIndex: "showingDate",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Slide",
      dataIndex: "slide",
      filterType: "select",
      options: [
        { label: "True", value: "True", tag: "blue" },
        { label: "False", value: "False", tag: "danger" },
      ],
    },
    {
      title: "Image",
      dataIndex: "image",
    },
  ];
  const onRowClick = (record) => {
    setShowAction(true);
    setClikedRaw(record);
  };

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-between items-baseline">
        <div className="">
          <div className="text-orange-600 font-bold text-[25px]">
            Movie List
          </div>
          <div className="">
            This is the list of all added movies by the admin
          </div>
        </div>
        <Button
          className="bg-orange-600 text-white"
          onClick={() => setCreate(true)}
        >
          Upload Movie
        </Button>
      </div>
      <div className="mt-5">
        {status === "loading" ? (
          <Loading />
        ) : (
          <div className="max-w-fulls max-h-fulls">
            <TableUi columns={columns} data={movies} onRowClick={onRowClick} />
          </div>
        )}
      </div>
      {showAction && (
        <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-[#ccccccd9]">
          <div
            className="relative w-[400px] h-[200px] rounded-xl bg-white flex flex-col items-center justify-center
         p-5"
          >
            <div
              className="absolute top-3 right-3"
              onClick={() => setShowAction(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="text-[20px] font-bold text-orange-600 ">
              Actions
            </div>
            <div className="text-gray-600 text-center text-[10px] mb-4 ">
              Actions you can perform to {clickedRaw?.title}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  const movieId = clickedRaw._id;
                  dispatch(deleteMovie(movieId));
                  setShowAction(false);
                }}
              >
                Delete Movie
              </Button>
              <Button
                onClick={() => {
                  const movieId = clickedRaw._id;
                  dispatch(addToSlide(movieId));
                  setShowAction(false);
                }}
              >
                {clickedRaw.slide === 'true'
                  ? "Remove From Slide"
                  : " Add To Slide"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {create && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-opacity-90 bg-[bg-[#ccccccd9]] backdrop-blur-3xl flex z-0 items-center justify-center">
          <CreateMovie setCreate={setCreate} />
        </div>
      )}
    </div>
  );
};

export default AdminMovie;
