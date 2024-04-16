import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { postMovie } from "../../function/Redux/Movies/movieSlice";

const CreateMovie = ({ setCreate }) => {
  const { error } = useSelector((state) => state.movie);
  const [selectedImage, setSelectedImage] = useState(null);
  const [genres, setGenres] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showTime, setShowTime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showingDate, setShowingDate] = useState([]);
  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    description: "",
    releaseDate: "",
    age: "",
    image: null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    releaseDate: Yup.date().required("Release date is required"),
    age: Yup.string().required("Age is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const seat = [
    {
      section: "A",
      seats: [
        { id: "A1", status: "active" },
        { id: "A2", status: "active" },
        { id: "A3", status: "active" },
        { id: "A4", status: "active" },
        { id: "A5", status: "active" },
        { id: "A6", status: "active" },
        { id: "A7", status: "active" },
        { id: "A8", status: "active" },
        { id: "A9", status: "active" },
        { id: "A10", status: "active" },
      ],
    },
    {
      section: "B",
      seats: [
        { id: "B1", status: "active" },
        { id: "B2", status: "active" },
        { id: "B3", status: "active" },
        { id: "B4", status: "active" },
        { id: "B5", status: "active" },
        { id: "B6", status: "active" },
        { id: "B7", status: "active" },
        { id: "B8", status: "active" },
        { id: "B9", status: "active" },
        { id: "B10", status: "active" },
      ],
    },
    {
      section: "C",
      seats: [
        { id: "C1", status: "active" },
        { id: "C2", status: "active" },
        { id: "C3", status: "active" },
        { id: "C4", status: "active" },
        { id: "C5", status: "active" },
        { id: "C6", status: "active" },
        { id: "C7", status: "active" },
        { id: "C8", status: "active" },
        { id: "C9", status: "active" },
        { id: "C10", status: "active" },
      ],
    },
  ];

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      if (!selectedImage) {
        // Handle case where no image is selected
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", "qelcdtp1");

      // Upload image to Cloudinary
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dd6wbwlw9/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const imageData = await response.json();
      const imageUrl = imageData.secure_url;
      console.log(imageData);
      // Construct movieData with the image URL
      const movieData = await {
        ...values,
        image: imageUrl,
        seat: seat,
        locations: locations,
        showTime: showTime,
        genres: genres,
        showingDate: showingDate,
      };

      // Dispatch action to create movie
      dispatch(postMovie(movieData));
      setSubmitting(false);
      setLoading(false);
      setCreate(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      // Handle error if image upload fails
    }
  };

  const ageList = ["G", "PG", "12A", "15A", "16", "18"];

  const genresList = ["Action", "Comedy", "Drama", "Sci-Fi"];
  const locationsList = ["Dublin", "Galway", "Cork"];
  const showTimeList = ["12pm-2D", "2pm-3D", "4pm-2D"];
  // Function to get the next 10 days starting from the current date
  const getNextTenDays = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const showingDateList = getNextTenDays();
  return (
    <div className="w-[800px] relative max-w-full min-h-[400px] max-h-full rounded-2xl bg-white py-16 px-10 overflow-auto">
      <div
        className="absolute cursor-pointer right-4 top-4"
        onClick={() => setCreate(null)}
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
      <div className="text-2xl font-bold mb-1 text-orange-600">
        Upload Movie
      </div>
      <div className="text-gray-600 mb-1">
        Fill in the movie details to upload a new movie
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="md:flex gap-3  justify-center">
              <div className="">
                <div className="mb-1">
                  <label
                    htmlFor="title"
                    className="block text-[10px] font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <Field
                    type="text"
                    name="title"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                  />
                  <ErrorMessage
                    name="title"
                    component="small"
                    className="text-red-500 text-[9px]"
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="description"
                    className="block text-[10px] font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <Field
                    type="textarea"
                    name="description"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                  />
                  <ErrorMessage
                    name="description"
                    component="small"
                    className="text-red-500 text-[9px]"
                  />
                </div>
                <div className="grid gap-1 grid-cols-2">
                  <div className="mb-1">
                    <label
                      htmlFor="releaseDate"
                      className="block text-[10px] font-medium text-gray-700"
                    >
                      Release Date
                    </label>
                    <Field
                      type="date"
                      name="releaseDate"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                    />
                    <ErrorMessage
                      name="releaseDate"
                      component="small"
                      className="text-red-500 text-[9px]"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="time"
                      className="block text-[10px] font-medium text-gray-700"
                    >
                      Age
                    </label>
                    <Field
                      as="select"
                      name="age"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                    >
                      {ageList.map((item, i) => (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="age"
                      component="small"
                      className="text-red-500 text-[9px]"
                    />
                  </div>
                </div>

                <div className="mb-1">
                  <div className="text-[10px] text-gray mt-3">
                    Select the Location Available
                  </div>
                  <div className="flex items-center gap-1">
                    {locationsList.map((location, i) => (
                      <div
                        className="text-[12px] rounded text-white p-1 bg-orange-600 cursor-pointer"
                        key={i}
                        onClick={() => {
                          if (!locations.includes(location)) {
                            setLocations((prevState) => [
                              ...prevState,
                              location,
                            ]);
                          }
                        }} // Corrected here
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2 text-sm1">
                    <div className=" font-extrabold text-orange-600">
                      Loactions:{" "}
                    </div>
                    {locations.map((location, i) => (
                      <div className="" key={i}>
                        {location}
                      </div>
                    ))}
                  </div>
                </div>

                {/* end of loaction */}

                <div className="mb-1">
                  <div className="text-[10px] text-gray mt-2">
                    Select the Time Available
                  </div>
                  <div className="flex items-center gap-1  ">
                    {showTimeList.map((item, i) => (
                      <div
                        className="text-[12px] rounded text-white p-1 bg-blue-600 cursor-pointer"
                        key={i}
                        onClick={() => {
                          if (!showTime.includes(item)) {
                            setShowTime((prevState) => [...prevState, item]);
                          }
                        }} // Corrected here
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2 text-sm1">
                    <div className=" font-extrabold text-blue-600">
                      Show Time:{" "}
                    </div>
                    {showTime.map((item, i) => (
                      <div className="" key={i}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* end of time  */}

                <div className="mb-1">
                  <div className="text-[10px] text-gray mt-2">
                    Select the Movie Genres
                  </div>
                  <div className="flex items-center gap-1  ">
                    {genresList.map((item, i) => (
                      <div
                        className="text-[12px] rounded text-white p-1 bg-green-600 cursor-pointer"
                        key={i}
                        onClick={() => {
                          if (!genres.includes(item)) {
                            setGenres((prevState) => [...prevState, item]);
                          }
                        }} // Corrected here
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2 text-sm1">
                    <div className=" font-extrabold text-green-600">
                      Movie Genre:{" "}
                    </div>
                    {genres.map((item, i) => (
                      <div className="" key={i}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-1">
                  <div className="text-[10px] text-gray mt-2">
                    Select the Showing Dates
                  </div>
                  <div className="grid grid-cols-5 items-center gap-1">
                    {showingDateList.map((date, i) => (
                      <div
                        className={`text-[12px] rounded p-1 cursor-pointer ${
                          showingDate.includes(date)
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-700"
                        }`}
                        key={i}
                        onClick={() => {
                          const updatedDates = showingDate.includes(date)
                            ? showingDate.filter((d) => d !== date)
                            : [...showingDate, date];
                          setShowingDate(updatedDates);
                        }}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-5 gap-2 text-sm1">
                    <div className=" font-extrabold text-blue-600">
                      Showing Dates:{" "}
                    </div>
                    {showingDate.map((date, i) => (
                      <div className="" key={i}>
                        {date}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="">
                <div className="mb-1">
                  <label
                    htmlFor="image"
                    className="block text-[10px] font-medium text-gray-700"
                  ></label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(event) => {
                      setSelectedImage(event.currentTarget.files[0]);
                      setFieldValue("image", event.currentTarget.files[0]);
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex items-center justify-center w-[200px] h-[300px] bg-gray-100 border border-gray-300 rounded-md"
                  >
                    {selectedImage ? (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Movie Poster"
                        className="max-h-full h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">Upload Image</span>
                    )}
                  </label>
                  <ErrorMessage
                    name="image"
                    component="small"
                    className="text-red-500 text-[9px]"
                  />
                </div>
              </div>
            </div>
            {error && <>{error}</>}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 mt-3 bg-orange-600 border border-transparent rounded-md font-semibold text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {loading ? "Loading...." : "Upload"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateMovie;
