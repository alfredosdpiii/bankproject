import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTransactionContext } from "../../States/TransactionContext";
import { message } from "card-number-generator/src/validator";
import { useNavigate, useLocation } from "react-router";
import SVG from "../Svg/SVG.component";
import { toast } from "react-toastify";

const Login = () => {
  const [{ accounts, user, isLoggedIn }, dispatch] = useTransactionContext();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname
    ? `${location.state?.from?.pathname}`
    : "/bankproject/account";
  const {
    register,
    handleSubmit,
    resetField,
    // setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const getAccountInfo = (data) => {
    const { email, password } = data;
    const userFromInput = {
      email,
      password,
    };
    if (verifyEmail(userFromInput) && verifyPassword(userFromInput)) {
      const currentUser = accounts.filter(
        ({ email }) => email === userFromInput.email
      );
      dispatch({
        type: "TOGGLE_LOGIN",
        isLoggedIn: true,
      });
      dispatch({
        type: "SET_USER",
        user: currentUser[0],
      });
      toast(`Welcome back!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      navigate(from);
    } else if (!verifyPassword(userFromInput) && verifyEmail(userFromInput)) {
      // setError("email", {
      //   type: "manual",
      //   message: "Incorrect email or password",
      // });
      toast(`Incorrect email or password`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(`Email does not exist`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const verifyEmail = (user) => {
    return accounts.some(({ email }) => email === user.email);
  };
  const verifyPassword = (user) => {
    return accounts.some(({ password }) => password === user.password);
  };

  return (
    <form
      className="w-full min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5"
      onSubmit={handleSubmit(getAccountInfo)}
    >
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-primary py-10 px-10">
            <SVG />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">Login</h1>
              <p>Enter your information to log in</p>
            </div>
            <div>
              {errors.email?.message === "true" ? (
                clearErrors("email")
              ) : (
                <p className="mb-10 text-red-400 text-sm font-robotoSemiBold">
                  {errors.email?.message}
                </p>
              )}
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">
                    Email
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="email"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary"
                      placeholder="johnsmith@example.com"
                      {...register("email", { required: "true" })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label for="" className="text-xs font-semibold px-1">
                    Password
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="password"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary"
                      placeholder="************"
                      {...register("password", { required: "true" })}
                    />
                  </div>
                  <p className="mt-6 text-s text-blue-500">
                    Don't have an account?{" "}
                    <span>
                      <Link
                        to="/bankproject/signup"
                        className="text-m text-blue-500"
                      >
                        Sign Up
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button className="block w-full max-w-xs mx-auto bg-primary hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
