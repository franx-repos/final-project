import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const ResetPassword = () => {

  return (
    <div className="antialiased ">
      <div className="max-w-lg mx-auto my-10  p-8  shadow shadow-gray-900 bg-slate-300 bg-opacity-[60%] rounded-3xl dark:bg-[#111827] dark:bg-opacity-[60%]">
        <h1 className="text-4xl font-medium text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ">Reset password</h1>
        <p className=" font-semibold text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
          Fill up the form to reset the password
        </p>

        {/* <ThemeToggle /> */}
        <form action="" className="my-10 ">
          <div className="flex flex-col space-y-5">
            <label for="email">
              <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight  text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Email address
              </p>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
              />
            </label>

            <button
             className="w-full py-3 font-medium text-gray-900 dark:text-white  bg-teal-500 hover:bg-teal-700   rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
            {/* className="text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700" */}
            
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>

              <span>Reset password</span>
            </button>
            <p className="text-center text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ">
              Not registered yet?{" "}
              <Link to="/signup">
                <p className="text-indigo-600 font-medium inline-flex space-x-1 items-center ">
                  <span>Register now </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </p>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
