import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UserProvider";
import ThemeToggle from "./ThemeToggle";
import Modalsignin from "./signinmodal/Modalsignin";
import UserDropdown from "./UserDropdown";

const styles = {
  container:
    "flex flex-wrap items-center justify-between mx-auto p-3 border-y-2 border-teal-500 shadow-2xl bg-slate-100/20 dark:bg-gray-900",
  logo: "flex items-center ml-2 space-x-3 rtl:space-x-reverse",
  button:
    "text-white bg-teal-500 hover:bg-teal-700  focus:outline-none font-medium rounded-lg text-sm mx-2 px-4 py-2 text-center dark:bg-teal-500 dark:hover:bg-teal-700",
  menuIcon: "w-5 h-5 ",
  nav: "items-center justify-between w-full md:flex md:w-auto md:order-1",
  navList:
    "flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700",
  activeMenuItem:
    "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-teal-700 md:p-0 md:dark:text-teal-300",
  menuItem:
    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 md:p-0 dark:text-white md:dark:hover:text-teal-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent bg-slate-100/20 dark:bg-gray-900/80",
};

const NavigationTop = () => {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <nav className="w-full bg-white/75 border-gray-200 dark:bg-gray-900/80">
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
              <UserDropdown />
              <ThemeToggle />
            </div>
          ) : (
            <div className="flex">
              {/* <Link to="modalsignin"> */}{" "}
              <button
                onClick={toggleLoginModal}
                type="button"
                className={styles.button}
              >
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
        </div>
        <div
          className={`${styles.nav} ${isNavbarOpen ? "flex" : "hidden"}`}
          id="navbar-user"
        >
          <ul className={styles.navList}>
            <li>
            <Link to="/" className={styles.menuItem} aria-current="page">
              <a href="#" className={styles.menuItem} aria-current="page">
                Home
              </a>
              </Link>
            </li>
            <li>
             <Link to="/about" className={styles.menuItem}>
              <a href="#" className={styles.menuItem}>
                About
              </a>
              </Link>
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
           <Link to="/contact">
              <a href="#" className={styles.menuItem}>
                Contact
              </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* <Modalsignin isModalOpen={isModalOpen} toggleModal={toggleModal} /> */}
      <Modalsignin
        isLoginModalOpen={isLoginModalOpen}
        toggleLoginModal={toggleLoginModal}
      />
    </nav>
  );
};

export default NavigationTop;
