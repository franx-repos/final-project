import { useEffect } from "react";
import NavigationTop from "../NavigationTop";
import ThemeToggle from "../ThemeToggle";
import DashboardSidebar from "./Sidebar";
import axios from "axios";
import { useAuth } from "../../context/UserProvider";

function Chat() {
  const { isLoggedIn, userData } = useAuth();

  useEffect(() => {
    console.log(userData);
    // const fetchChat = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:8001/chats/");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
  }, [userData]);

  return (
    <>
      <ThemeToggle />
      <NavigationTop />
      <DashboardSidebar />
    </>
  );
}

export default Chat;
