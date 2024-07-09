import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserProvider";
import axios from "axios";

const styles = {
  userButton:
    "flex text-sm bg-teal-600 rounded-full md:me-3 p-1 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600",
  userImage: "w-8 h-8 rounded-full",
  dropdown:
    "z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600",
  dropdownOpen: "block", // Tailwind class for displaying the dropdown
  dropdownItem:
    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white",
  dropdownInfo: "px-4 py-3",
  dropdownName: "block text-sm text-gray-900 dark:text-white",
  dropdownEmail: "block text-sm text-gray-500 truncate dark:text-gray-400",
};

const UserDropdown = () => {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const deploy = import.meta.env.VITE_DEPLOY_URL;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // useEffect(() => {
  //   const storedAuth = localStorage.getItem('auth');
  //   if (storedAuth === 'true') {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${deploy}/clients/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem('auth');
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

  return (
    <div className="flex items-center space-x-3 relative">
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
            src="https://flowbite.com/application-ui/demo/images/users/jese-leos-2x.png"
            alt="user photo"
          />
        </button>
      </div>

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
          <span className={styles.dropdownEmail}>{userData?.data?.email}</span>
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
            <Link to="/order" className={styles.dropdownItem}>
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
    </div>
  );
};

export default UserDropdown;
