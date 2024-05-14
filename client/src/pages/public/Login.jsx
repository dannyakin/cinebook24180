import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../function/Redux/Auth/AuthSlice";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="w-screen h-screen flex items-center justify-center px-4">
      <div className="bg-white w-[800px] h-[500px] max-full max-h-full overflow-hidden rounded-xl  shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="p-3">
            <div className="flex h-full w-full justify-center flex-col">
              {/* Login form */}
              <div className="mb-4 mt-5">
                <div className="text-2xl text-orange-500">Login</div>
                <div className="text-sm text-gray-500">
                  Fill your information to login to your account.
                </div>
              </div>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Email is required"),
                  password: Yup.string().required("Password is required"),
                })}
                onSubmit={(userData) => {
                  dispatch(loginUser(userData));
                  // Handle form submission here
                }}
              >
                <Form>
                  <div>
                    <Field
                      className="border px-2 py-3 w-full rounded mb-2 text-xs"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="small"
                      className="text-red-500 text-xs mb-3"
                    />
                  </div>

                  <div>
                    <Field
                      className="border px-2 py-3 w-full rounded mb-2 text-xs"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="small"
                      className="text-red-500 text-xs mb-3"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-orange-600 w-full p-2 text-white mt-4 mb-4 rounded"
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                  {error && (
                    <div className="text-red-500 text-xs mb-3 text-center">
                      {error}
                    </div>
                  )}
                </Form>
              </Formik>

              <Link
                to="/register"
                className="cursor-pointer text-gray-600 text-xs text-center mb-5"
              >
                Don't have an account?{" "}
                <span className="text-blue-400">Register here.</span>
              </Link>
              {/* End of login form */}
            </div>
          </div>
          <div className="bg-orange-600  hidden md:block authBg" ></div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Login;
