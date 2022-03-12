import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTransactionContext } from "../../States/TransactionContext";
import cardGen from "card-number-generator";
import { useNavigate } from "react-router";
import SVG from "../Svg/SVG.component";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Signup = () => {
  const [{ accounts, totalFunds, totalExpense, expensesList }, dispatch] =
    useTransactionContext();
  useEffect(() => {
    // sett the users to local storage when accounts array change
    localStorage.setItem("Users", JSON.stringify(accounts));
  }, [accounts]);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const getAccountInfo = (data) => {
    const { userName, email, password, firstName, lastName, pin, totalFunds } =
      data;
    const randomCardNumber = cardGen({ issuer: "MasterCard" });

    const userInfo = {
      firstName,
      lastName,
      pin,
      expensesList,
      userName,
      email,
      password,
      id: uuidv4(),
      card: randomCardNumber,
      totalExpense,
      totalFunds: parseInt(totalFunds),
    };
    // check if user exist
    if (!isUserExist(email)) {
      dispatch({
        type: "ADD_USER",
        account: userInfo,
      });
      // toast(`${email} successfuly registered`, {
      //   type: "success",
      // });
      toast(`${email} successfully registered!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // reset fields
      resetField("email");
      resetField("password");
      resetField("userName");
      navigate("/bankproject");

      // } else if (!isPasswordValid) {
      //   // show error if the user exist
      //   alert.show(`Invalid password format`, {
      //     type: "error",
      //   });
      //   return;
    } else {
      // show error if the user exist
      // alert.show(`${email} already exist`, {
      //   type: "error",
      // });
      toast(`email exists!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  };
  const isUserExist = (signUpEmail) => {
    return accounts.some(({ email }) => email === signUpEmail);
  };

  return (
    <form
      className="w-full min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5"
      onSubmit={handleSubmit(getAccountInfo)}
    >
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-secondary py-10 px-10">
            <SVG />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
              <p>Enter your information to register</p>
            </div>
            <div>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">
                    First name
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-500"
                      placeholder="John"
                      {...register("firstName", { required: "true" })}
                    />
                  </div>
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">
                    Last name
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-500"
                      placeholder="Smith"
                      {...register("lastName", { required: "true" })}
                    />
                  </div>
                </div>
              </div>
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
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-500"
                      placeholder="johnsmith@example.com"
                      {...register("email", { required: "true" })}
                    />
                  </div>
                </div>
                <div className="w-full px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">
                    Username
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="text"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-500"
                      placeholder="johnsmith@example.com"
                      {...register("userName", { required: "true" })}
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
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-500"
                      placeholder="************"
                      {...register("password", { required: "true" })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">
                    PIN
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="password"
                      maxLength={4}
                      minLength={4}
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary"
                      placeholder="John"
                      {...register("pin", { required: "true" })}
                    />
                  </div>
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">
                    Initial Deposit
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="number"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-500"
                      placeholder="1000"
                      {...register("totalFunds", { required: "true" })}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-s text-blue-500 pb-10">
                Already have an account?{" "}
                <span>
                  <Link to="/bankproject" className="text-m text-blue-500">
                    Login
                  </Link>
                </span>
              </p>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button className="block w-full max-w-xs mx-auto bg-primary hover:bg-primary-700 focus:bg-primary-700 text-secondary rounded-lg px-3 py-3 font-semibold">
                    REGISTER NOW
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

export default Signup;
