import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/UserProvider";
import ChatWindow from "./ChatWindow";

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
      <div className="flex w-full flex-col bg-white rounded-md dark:text-white dark:bg-[#1f2937]">
        <ChatWindow />
      </div>
    </>
  );
}

export default Chat;
