import { Sidebar } from "flowbite-react";
import { HiChartPie, HiInbox, HiUser, HiViewBoards } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserProvider";
import React, { useEffect, useState } from "react";
import logo from "../../assets/TaxMax-Logo3.png";

const styles = {
  sidebarItem: "justify-start text-left text-xl p-4",
};

function DashboardSidebar({ currentLocation, setCurrentLocation }) {
  const handleLocation = (location) => (e) => {
    e.preventDefault();
    setCurrentLocation(location);
  };

  const { userData } = useAuth();
  const [loading, setLoading] = useState(true);

  const sbItems = [
    {
      title: "Dashboard",
      path: "#",
      icon: HiChartPie,
      label: "",
      onclick: handleLocation("Dashboard"),
    },
    {
      title: "Tasks",
      path: "#",
      icon: HiViewBoards,
      label: "",
      onclick: handleLocation("Task Overview"),
    },
    {
      title: "Chat",
      path: "#",
      icon: HiInbox,
      label: "",
      onclick: handleLocation("Chat"),
    },
    {
      title: "User Profile",
      path: "#",
      icon: HiUser,
      label: "",
      onclick: handleLocation("User Profile"),
    },
  ];

  if (userData?.data?.role === "client") {
    sbItems.shift();
  }

  return (
    <Sidebar className="h-screen pt-5 sticky top-0 bg-gray-50 dark:bg-gray-800">
      <Link
        to="/"
        className="flex items-center ml-2 space-x-3 rtl:space-x-reverse"
      >
        <img src={logo} className="h-8" alt="TaxMax Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
      </Link>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {sbItems.map((item, index) => {
            return (
              <Sidebar.Item
                key={index}
                className={styles.sidebarItem}
                href={item.onclick ? "#" : item.path}
                icon={item.icon}
                label={item.label}
                onClick={item.onclick}
              >
                {item.title}
              </Sidebar.Item>
            );
          })}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashboardSidebar;
