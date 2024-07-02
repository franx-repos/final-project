import { useEffect, useState } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatInput from "./ChatInput";
import { useAuth } from "../../context/UserProvider";
import axios from "axios";

const ChatWindow = ({ socket }) => {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useAuth();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (userData) {
      // Add this check
      const fetchChat = async () => {
        let url = "";
        if (userData.data && userData.data.role === "client") {
          url = `http://localhost:8001/chats/client_chat/`;
        } else {
          url = `http://localhost:8001/chats/pro_chat/`;
        }
        console.log(url);
        try {
          const response = await axios.get(url,{withCredentials: true});
          // console.log(response);
          setChats(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchChat();
    }
  }, [userData]);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  return (
    <section className="flex w-full h-screen justify-start antialiased text-gray-600 p-4 pb-24 ">
      <div className=" flex ">
        <ChatSideBar chats={chats} />
      </div>
      <div className="flex flex-col  w-full mx-9 shadow-lg rounded-lg">
        <div className="flex-1 overflow-y-scroll border-gray-200 dark:bg-gray-800"></div>
        <ChatInput />
      </div>
    </section>
  );
};

export default ChatWindow;
