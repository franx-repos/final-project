import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserProvider";
import axios from "axios";
import ThemeToggle from "./ThemeToggle";
// import { useAuth } from "../context/UserProvider.jsx";
import Modalsignin from "./signinmodal/Modalsignin";

const styles = {
  container:
    "flex flex-wrap items-center justify-between mx-auto p-3 border-y-2 border-teal-500 shadow-2xl",
  logo: "flex items-center ml-2 space-x-3 rtl:space-x-reverse",
  button:
    "text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700",
  userButton:
    "flex text-sm bg-gray-800 rounded-full md:me-3 p-1 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600",
  userImage: "w-8 h-8 rounded-full",
  dropdown:
    "z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600",
  dropdownOpen: "block", // Tailwind class for displaying the dropdown
  dropdownItem:
    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white",
  dropdownInfo: "px-4 py-3",
  dropdownName: "block text-sm text-gray-900 dark:text-white",
  dropdownEmail: "block text-sm text-gray-500 truncate dark:text-gray-400",
  toggleButton:
    "inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
  menuIcon: "w-5 h-5",
  nav: "items-center justify-between w-full md:flex md:w-auto md:order-1",
  navList:
    "flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700",
  activeMenuItem:
    "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-teal-700 md:p-0 md:dark:text-teal-300",
  menuItem:
    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 md:p-0 dark:text-white md:dark:hover:text-teal-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700",
};

const NavigationTop = () => {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `http://localhost:8001/clients/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      setIsDropdownOpen(false);
      setUserData({});
      navigate("/");
    } catch (error) {
      console.log("Error:", error.message);
      console.log("Error:", error.response.data);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    }
  };

  useEffect(() => {
    console.log("Userdata:", userData);
    console.log("isloggedin:", isLoggedIn);
    console.log("Cookies:", document.cookie);
  }, [userData, isLoggedIn]);

  return (
    <nav className=" w-full bg-white/75 border-gray-200 dark:bg-gray-900/80 relative">
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img
            src="\src\assets\TaxMax-Logo3.png"
            className="h-8"
            alt="TaxMax Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          {isLoggedIn ? (
            <div className="flex">
              <button
                type="button"
                className={styles.userButton}
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className={styles.userImage}
                  src="/docs/images/people/profile-picture-3.jpg"
                  alt="user photo"
                />
              </button>
              <ThemeToggle />
            </div>
          ) : (
            <div className="flex">
              {/* <Link to="modalsignin"> */}
                {" "}
                <button onClick={toggleModal} type="button" className={styles.button}>
                  Login
                </button>
              {/* </Link> */}

              <Link to="signup">
                {" "}
                <button type="button" className={styles.button}>
                  Register
                </button>
              </Link>
              <ThemeToggle />
            </div>
          )}

          {/* Dropdown menu */}
          <div
            className={`${styles.dropdown} ${
              isDropdownOpen ? "block" : "hidden"
            } absolute top-full right-0`}
            id="user-dropdown"
          >
            <div className={styles.dropdownInfo}>
              <span className={styles.dropdownName}>
                {userData?.data?.first_name}
              </span>
              <span className={styles.dropdownEmail}>
                {userData?.data?.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <NavLink to="/Dashboard" className={styles.dropdownItem}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <a href="#" className={styles.dropdownItem}>
                  Settings
                </a>
              </li>
              <li>
                <Link to="/order"  className={styles.dropdownItem}>
                My Task
                </Link>
              </li>
              <li>
                <a onClick={handleLogout} className={styles.dropdownItem}>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className={styles.toggleButton}
            aria-controls="navbar-user"
            aria-expanded={isNavbarOpen}
            onClick={toggleNavbar}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={styles.menuIcon}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${styles.nav} ${isNavbarOpen ? "flex" : "hidden"}`}
          id="navbar-user"
        >
          <ul className={styles.navList}>
            <li>
              <a href="#" className={styles.activeMenuItem} aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a href="#" className={styles.menuItem}>
                About
              </a>
            </li>
            <li>
              <a href="#" className={styles.menuItem}>
                Services
              </a>
            </li>
            <li>
              <a href="#" className={styles.menuItem}>
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className={styles.menuItem}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <Modalsignin isModalOpen={isModalOpen} toggleModal={toggleModal} /> */}
    <Modalsignin isModalOpen={isModalOpen} toggleModal={toggleModal} /> 
    
    </nav>
  );
};

export default NavigationTop;
