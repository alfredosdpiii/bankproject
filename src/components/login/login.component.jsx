import React from "react";

function Login() {
  return (
    <>
      <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl text-gray-900">Login</h1>
          <p>Enter your information to log in</p>
        </div>
        <div>
          {/* <div className="flex -mx-3"> */}
          {/*   <div className="w-1/2 px-3 mb-5"> */}
          {/*     <label for="" className="text-xs font-semibold px-1"> */}
          {/*       First name */}
          {/*     </label> */}
          {/*     <div className="flex"> */}
          {/*       <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"> */}
          {/*         <i className="mdi mdi-account-outline text-gray-400 text-lg"></i> */}
          {/*       </div> */}
          {/*       <input */}
          {/*         type="text" */}
          {/*         className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" */}
          {/*         placeholder="John" */}
          {/*       /> */}
          {/*     </div> */}
          {/*   </div> */}
          {/*   <div className="w-1/2 px-3 mb-5"> */}
          {/*     <label for="" className="text-xs font-semibold px-1"> */}
          {/*       Last name */}
          {/*     </label> */}
          {/*     <div className="flex"> */}
          {/*       <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"> */}
          {/*         <i className="mdi mdi-account-outline text-gray-400 text-lg"></i> */}
          {/*       </div> */}
          {/*       <input */}
          {/*         type="text" */}
          {/*         className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" */}
          {/*         placeholder="Smith" */}
          {/*       /> */}
          {/*     </div> */}
          {/*   </div> */}
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
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="johnsmith@example.com"
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
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="************"
                />
              </div>
            </div>
          </div>
          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
