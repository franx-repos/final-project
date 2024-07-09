import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/UserProvider";
import ChatWindow from "./ChatWindow";

const deploy = import.meta.env.VITE_DEPLOY_URL;

function Chat() {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useAuth();

  // useEffect(() => {
  //   console.log(userData._id);
  //   const fetchChat = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8001/chats/client_chat/${userData._id}`
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchChat();
  // }, [userData]);

  return (
    <>
      <div className="flex w-full h-[calc(100%-5.5rem)] flex-col bg-white rounded-md dark:text-white dark:bg-gray-900">
        <ChatWindow />
      </div>
    </>
  );
}

export default Chat;
