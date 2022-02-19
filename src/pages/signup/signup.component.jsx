import React from "react";
import SVG from "../../components/signup/signupSVG.component";
import RegisterForm from "../../components/register/registerForm.component";

function SignUp() {
  return (
    <>
      <div class="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
        <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
          <div class="md:flex w-full">
            <div class="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
              <SVG />
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
