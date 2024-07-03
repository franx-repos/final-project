import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useCallback } from "react";

const styles = {
  sidebarItem: "justify-start text-xl px-6 py-4",
};

function DashboardSidebar(currentLocation, setCurrentLocation) {
  const handleLocation = useCallback((location) => (e) => {
    e.preventDefault();
    setCurrentLocation(location);
    console.log(`Current location: ${currentLocation}`);
  });

  const sbItems = [
    {
      title: "Dashboard",
      path: "#",
      icon: HiChartPie,
      label: "",
      onclick: handleLocation("dashboard"),
    },
    {
      title: "Kanban",
      path: "#",
      icon: HiViewBoards,
      label: "",
      onclick: handleLocation("kanban"),
    },
    {
      title: "Chat",
      path: "#",
      icon: HiInbox,
      label: "3",
      onclick: handleLocation("chat"),
    },
    {
      title: "Users",
      path: "#",
      icon: HiUser,
      label: "",
      onclick: handleLocation("users"),
    },
    {
      title: "Products",
      path: "#",
      icon: HiShoppingBag,
      label: "",
      onclick: handleLocation("products"),
    },
    {
      title: "Sign In",
      path: "#",
      location: "signIn",
      icon: HiTable,
      label: "",
      onclick: handleLocation("signin"),
    },
  ];

  return (
    <Sidebar className="w-52 h-screen bg-gray-50 dark:bg-gray-800">
      <Sidebar.Items className="h-screen">
        <Sidebar.ItemGroup>
          {sbItems.map((item, index) => (
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
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashboardSidebar;
