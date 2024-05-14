import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDataAPI } from "../../../utils/api";

const AdminDashboard = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchDashboar = async () => {
      try {
        setError(null)
        const res = await getDataAPI("api/admin");
        setDashboard(res.data);
        console.log(res)
      } catch (error) {
        setError("Error fetching statistics ");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboar();
  },[]);
  return (
    <div className="w-screen">
      <div className="container mx-auto">
        <div className="my-3">
          <div className=" text-[20px]">
            Welcome Back!{" "}
            <span className="font-bold text-orange-600">
              {currentUser?.fullName}{" "}
            </span>{" "}
          </div>
          <div className="text-zinc-500 text-[12px]">
            This is the overall summary for the admin.
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="border border-gray-200 rounded-xl p-3 md:px-55 py-5">
            {loading ? (
              "Loading.."
            ) : error ? (
              <div className="text-[12px] text-red-600">{error}</div>
            ) : (
              <div>
                <div className="text-gray-500">Users</div>
                <div className="text-[25px] font-bold">
                  {dashboard?.users?.length}
                </div>
                <div className="text-[12px]">
                  This is the list of all the users{" "}
                  <Link to="/admin/users" className="text-blue-500">
                    View More{" "}
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="border border-gray-200 rounded-xl p-3 md:px-55 py-5">
            {loading ? (
              "Loading.."
            ) : error ? (
              <div className="text-[12px] text-red-600">{error}</div>
            ) : (
              <div>
                <div className="text-gray-500">Movies</div>
                <div className="text-[25px] font-bold">
                  {dashboard?.movies?.length}
                </div>
                <div className="text-[12px]">
                  This is the list of all the Movies Uploaded{" "}
                  <Link to="/admin/movies" className="text-blue-500">
                    View More{" "}
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="border border-gray-200 rounded-xl p-3 md:px-55 py-5">
            {loading ? (
              "Loading.."
            ) : error ? (
              <div className="text-[12px] text-red-600">{error}</div>
            ) : (
              <div>
                <div className="text-gray-500">Tickets</div>
                <div className="text-[25px] font-bold">
                  {dashboard?.tickets?.length}
                </div>
                <div className="text-[12px]">
                  This is the total amount ot sold tickets.{" "}
                  <Link to="/admin/ticket" className="text-blue-500">
                    View More{" "}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
