import React from "react";
import SVG from "../../components/signup/signupSVG.component";
// import SignupForm from "../../components/signupForm/signupForm.component";
import Login from "../../components/login/login.component";
import Navbar from "../../globalComponents/navbar.js";

function SignUp() {
  return (
    <>
      <Navbar />
      <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
              <SVG />
            </div>
            {/* <SignupForm /> */}
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
