import { Sidebar } from "flowbite-react";
import { IoSettingsSharp } from "react-icons/io5";
import { FaClipboardUser } from "react-icons/fa6";
import { BsClipboardPlus } from "react-icons/bs";
const styles = {
  sidebarItem: "justify-start text-xl px-6 py-4",
};

const sbItems = [
  { title: "Task overview", path: "#", icon: FaClipboardUser , label: "" },
  // { title: "Kanban", path: "#", icon: HiViewBoards, label: "" },
  // { title: "Inbox", path: "#", icon: HiInbox, label: "3" },
  // { title: "Users", path: "#", icon: IoAdd , label: "" },
  { title: "Create Task", path: "#", icon: BsClipboardPlus , label: "" },
  { title: "Settings", path: "#", icon: IoSettingsSharp, label: "" },
];

function AuftragÜbersichtSidebar() {
  return (
    <Sidebar className="w-52 h-screen bg-gray-50 dark:bg-gray-800">
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

export default AuftragÜbersichtSidebar;
