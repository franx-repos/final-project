import { Sidebar } from "flowbite-react";
import { IoSettingsSharp } from "react-icons/io5";
import { FaClipboardUser } from "react-icons/fa6";
import { BsClipboardPlus } from "react-icons/bs";
import { useState } from "react";
const styles = {
  sidebarItem: "justify-start text-xl px-6 py-4",
};

const sbItems = [
  { title: "Task Overview", path: "", icon: FaClipboardUser , label: "" },
  { title: "Create Task", path: "#", icon: BsClipboardPlus , label: "" },
  { title: "Settings", path: "#", icon: IoSettingsSharp, label: "" },
];
// const [CreatTask, setCreatTask] = useState(false);
// const [Settings, setSettings] = useState(false);
// const [TaskOverview, setTaskOverview] = useState(false);



function AuftragÜbersichtSidebar() {


  return (
    <Sidebar className="w-60 h-screen bg-gray-50 dark:bg-gray-800">
      <Sidebar.Items className="h-full overflow-hidden w-full">
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
