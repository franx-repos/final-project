import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const styles = {
  sidebarItem: "justify-start text-xl px-6 py-4",
};

const sbItems = [
  { title: "Dashboard", path: "#", icon: HiChartPie, label: "" },
  { title: "Kanban", path: "#", icon: HiViewBoards, label: "" },
  { title: "Inbox", path: "#", icon: HiInbox, label: "3" },
  { title: "Users", path: "#", icon: HiUser, label: "" },
  { title: "Products", path: "#", icon: HiShoppingBag, label: "" },
  { title: "Sign In", path: "#", icon: HiTable, label: "" },
];

function DashboardSidebar() {
  return (
    <Sidebar className="fixed h-screen bg-gray-50 dark:bg-gray-800">
      <Sidebar.Items className="h-screen">
        <Sidebar.ItemGroup>
          {sbItems.map((item, index) => (
            <Sidebar.Item
              key={index}
              className={styles.sidebarItem}
              href={item.path}
              icon={item.icon}
              label={item.label}
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
