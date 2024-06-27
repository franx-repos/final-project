import { useEffect } from "react";
import NavigationTop from "../NavigationTop";
import ThemeToggle from "../ThemeToggle";
import DashboardSidebar from "./Sidebar";
import axios from "axios";
import { useAuth } from "../../context/UserProvider";
import ChatWindow from "./ChatWindow";

function Chat() {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useAuth();

  useEffect(() => {
    console.log(userData._id);
    const fetchChat = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/chats/client_chat/${userData._id}`
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChat();
  }, [userData]);

  return (
    <>
      {" "}
      <div className="bg-white border-gray-200 dark:bg-gray-900">
        {/* <ThemeToggle /> */}
        <NavigationTop />
        <div className="flex">
          <DashboardSidebar />
          <ChatWindow />
        </div>
      </div>
    </>
  );
}

export default Chat;
