import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../function/Redux/Auth/AuthSlice";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-white w-[800px] h-[500px] max-full max-h-full overflow-hidden rounded-xl  shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="bg-orange-600 hidden md:block"></div>
          <div className="p-3">
            <div className="flex h-full w-full justify-center flex-col">
              {/* Login form */}
              <div className="mb-4 mt-5">
                <div className="text-2xl text-orange-500">Create Account</div>
                <div className="text-sm text-gray-500">
                  Fill your information to create an ccount with us.
                </div>
              </div>
              <Formik
                initialValues={{
                  fullName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={Yup.object({
                  fullName: Yup.string().required("Full Name is required"),
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Email is required"),
                  password: Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password is required"),
                  confirmPassword: Yup.string()
                    .oneOf([Yup.ref("password"), null], "Passwords must match")
                    .required("Confirm Password is required"),
                })}
                onSubmit={(userData) => {
                  // Handle form submission here
                  dispatch(registerUser(userData));
                }}
              >
                <Form>
                  <div>
                    <Field
                      className="border px-2 py-3 w-full rounded mb-2 text-xs"
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Full Name"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="small"
                      className="text-red-500 text-xs mb-3"
                    />
                  </div>

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
                      placeholder="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="small"
                      className="text-red-500 text-xs mb-3"
                    />
                  </div>

                  <div>
                    <Field
                      className="border px-2 py-3 w-full rounded mb-2 text-xs"
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="small"
                      className="text-red-500 text-xs mb-3"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    By creating an account you agree to out terms and conditions
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-600 w-full p-2 text-white mt-4 mb-4 rounded"
                  >
                    {loading ? "Loading..." : "Register"}
                  </button>
                </Form>
              </Formik>
              {error && (
                <div className="text-red-500 text-xs mb-3 text-center">
                  {error}
                </div>
              )}
              <Link
                to="/login"
                className="cursor-pointer text-gray-600 text-xs text-center mb-5"
              >
                I have an account?{" "}
                <span className="text-blue-400">Login here.</span>
              </Link>
              {/* End of login form */}
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Register;
