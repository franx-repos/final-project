import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/UserProvider.jsx";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoggedIn, checkUser} = useAuth();
  const [client, setClient] = useState(false);
  const [role, setRole] = useState('');

  const deploy = import.meta.env.VITE_DEPLOY_URL;
  // ${deploy}


  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (client === false) {
      try {
        const response = await axios.post(
          `http://localhost:8001/clients/login`,
          { 
            data:
             {
              role,
            email,
            password,
           }
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
          `http://localhost:8001/pros/login`,
          { 
            data: {
              role,
            email,
            password,
            }
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


  useEffect(() => { 
    console.log(`email:  ${email}`)
    console.log(`password: ${password}`)
    console.log(`client: ${client}`);
    console.log(`role: ${role}`);
    }, [email,password,client,role]);
 


  return (
    <>
    <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin} >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 shadow shadow-gray-900 bg-slate-300 rounded-3xl p-6 bg-opacity-50 dark:bg-[#4b566e] dark:bg-opacity-50 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to='/'>
          <img className="mx-auto h-10 w-auto" src="./public/TaxMax-Logo3.svg" alt="TAXMAX" />
          </Link>
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
                  onChange={() => {setRole('Client'),setClient(false);}}
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
                  onClick={() => {setRole('pro'),setClient(true)}}
                />
                <label className="segmented-control__label text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800" htmlFor="option-2">
                  Professional
                </label>
              </a>
            </li>
          </ul>
          </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
               value={email}
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
                    className="font-semibold text-indigo-600 hover:text-indigo-500  dark:text-blue-500 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
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
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
              />
              </div>
            </div>

            <div>
              <button
                type="submit"
                // className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              className="text-white bg-teal-500 mt-3 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700"
              >
                Sign in
              </button>
              <p className='mt-4 dark:text-white'>
          Not registered yet?{' '}
          <Link to='/signup' className='text-blue-500 underline'>
            Register here
          </Link>
        </p>
            </div>
        </div>
      </div>
          </form>
    </>
  );
};

export default Signin;
