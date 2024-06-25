import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import ThemeToggle from "./ThemeToggle";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [client, setClient] = useState(false);


  const deploy = import.meta.env.VITE_DEPLOY_URL;
  // ${deploy}


  const navigate = useNavigate();

  const handleLoginClient = async (e) => {
    e.preventDefault();
    if (client === false) {
      try {
        const response = await axios.post(
          `${deploy}/clients/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setIsLoggedIn(true);
          checkUser();
          navigate("/");
        }
      } catch (error) {
        setError(error.message || "Something went wrong with Login");
      }
    } else {
      handleLoginprofi(e);
    }
  };

  const handleLoginprofi = async (e) => {
    e.preventDefault();
      try {
        const response = await axios.post(
          `${deploy}/profi/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setIsLoggedIn(true);
          checkUser();
          navigate("/");
        }
      } catch (error) {
        setError(error.message || "Something went wrong with Login");
      }
  };

//   useEffect(() => { 
//     console.log(email)
//     }, [email]);
//     useEffect(() => { 
//         console.log(password)
//         }, [password]);
    
//       useEffect(() => {
//     console.log(client);
//   }, [client]);



  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 shadow shadow-gray-900 bg-slate-300 rounded-3xl p-6 bg-opacity-50 dark:bg-[#111827] dark:bg-opacity-50 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="" alt="TAXMAX" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight  text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-4">
        <ul className="segmented-control shadow-sm shadow-gray-900">
            <li className="segmented-control__item">
              <a href="#">
                <input
                  className="segmented-control__input"
                  type="radio"
                  value="1"
                  name="option"
                  id="option-1"
                  onClick={() => setClient(false)}
                  checked={!client}
                />
                <label className="segmented-control__label text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800" htmlFor="option-1">
                  Client
                </label>
              </a>
            </li>
            <li className="segmented-control__item">
              <a href="#">
                <input
                  className="segmented-control__input"
                  type="radio"
                  value="2"
                  name="option"
                  id="option-2"
                  onClick={() => setClient(true)}
                />
                <label className="segmented-control__label text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800" htmlFor="option-2">
                  Professional
                </label>
              </a>
            </li>
          </ul>
          </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleLoginClient} >
          <ThemeToggle />
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm shadow-gray-900 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=> setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Password
                </label>

                <div className="text-sm">
                 
                 <Link to='/reset-pass'><a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500  dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                  >
                    Forgot password?
                  </a>
                  </Link>
                </div>
              </div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm shadow-gray-900 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e)=> setPassword(e.target.value)}
              />
              </div>
            </div>

            <div>
              <button
                type="submit"
                // className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              className="text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
