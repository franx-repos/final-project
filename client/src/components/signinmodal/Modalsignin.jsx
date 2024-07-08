import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserProvider.jsx";
import axios from "axios";

const Modalsignin = ({ isLoginModalOpen, toggleLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoggedIn, checkUser } = useAuth();
  const [client, setClient] = useState(false);
  const [role, setRole] = useState("client");

  const navigate = useNavigate();
  const deploy = import.meta.env.VITE_DEPLOY_URL;
  // ${deploy}

  const handleLogin = async (e) => {
    e.preventDefault();
    if (client === false) {
      try {
        const response = await axios.post(
          `${deploy}/clients/login`,
          {
            data: {
              role,
              email,
              password,
            },
          },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setIsLoggedIn(true);
          checkUser();
          navigate("/Dashboard");
          toggleLoginModal();
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
        `${deploy}/pros/login`,
        {
          data: {
            role,
            email,
            password,
          },
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
        checkUser();
        navigate("/Dashboard");
        toggleLoginModal();
      }
    } catch (error) {
      setError(error.message || "Something went wrong with Login");
    }
  };

  if (!isLoginModalOpen) return null;

  return (
    <>
      {/* Main modal */}
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto bg-gray-900/70"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleLogin}
          >
            <div className="flex flex-1 flex-col w-fit m-auto justify-center px-6 py-12 lg:px-8 shadow shadow-gray-900 rounded-lg p-6 border-gray-200 bg-white dark:bg-gray-900 dark:border-teal-300">
              <div className="absolute top-0 right-0 p-4 mr-8 mt-4 ">
                <button
                  type="button"
                  onClick={toggleLoginModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link to="/">
                  <img
                    className="mx-auto h-10 w-auto"
                    src=".\src\assets\TaxMax-Logo3.svg"
                    alt="TAXMAX"
                  />
                </Link>

                {error && (
                  <div className="text-sm text-red-500 mt-3">
                    <p>{"your email or password is incorrect"}</p>
                  </div>
                )}

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                  Sign in!
                </h2>
              </div>

              <div className="mt-4">
                <ul className="segmented-control shadow-sm shadow-gray-900">
                  <li className="segmented-control__item">
                    <a href="#">
                      <input
                        className="segmented-control__input"
                        type="radio"
                        value="client"
                        name="option"
                        id="option-1"
                        onChange={() => {
                          setRole("client");
                          setClient(false);
                        }}
                        checked={!client}
                      />
                      <label
                        className="segmented-control__label text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        htmlFor="option-1"
                      >
                        Client
                      </label>
                    </a>
                  </li>
                  <li className="segmented-control__item">
                    <a href="#">
                      <input
                        className="segmented-control__input"
                        type="radio"
                        value="pro"
                        name="option"
                        id="option-2"
                        onChange={() => {
                          setRole("pro");
                          setClient(true);
                        }}
                        checked={client}
                      />
                      <label
                        className="segmented-control__label text-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        htmlFor="option-2"
                      >
                        Professional
                      </label>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                      className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm shadow-gray-900 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      <Link to="/reset-pass">Forgot password?</Link>
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
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="text-white bg-teal-500 mt-3 hover:bg-teal-700 focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700"
                  >
                    Sign in
                  </button>
                  <p className="mt-4 dark:text-white">
                    Not registered ?{" "}
                    <Link
                      to="/signup"
                      onClick={toggleLoginModal}
                      className="text-blue-500 underline"
                    >
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modalsignin;
