import { useEffect, useState } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatInput from "./ChatInput";
import { useAuth } from "../../context/UserProvider";
import { useChat } from "../../context/ChatProvider";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import socketIO from "socket.io-client";

const ChatWindow = () => {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useAuth();
  const [chats, setChats] = useState([]);
  const {
    messages,
    setMessages,
    socket,
    setSocket,
    room,
    saveNewMessage,
    setSaveNewMessage,
  } = useChat();
  const [entry, setEntry] = useState([]);
  useEffect(() => {
    if (!socket) {
      let s = socketIO.connect("http://localhost:3000");
      setSocket(s);
    }
  }, []);

  useEffect(() => {
    if (socket && socket.connected) {
      console.log("Socket is connected");
      socket
        .on("recieve-message", (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        })
        .on("error", (error) => {
          console.error("Error handling recieve-message event:", error);
        });
    } else {
      console.log("Socket is not connected");
    }
  }, [socket, chats]);

  useEffect(() => {
    console.log(`save the message: ${saveNewMessage}`);
    console.log(messages);
    const saveMessages = async () => {
      try {
        const response = await axios.patch(
          `http://localhost:8001/chats/${room}`,
          { messages },
          { withCredentials: true }
        );
        console.log(response);
        if (response) {
          setSaveNewMessage(false); // Update saveNewMessage state to false
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (saveNewMessage) {
      saveMessages();
    }
  }, [messages]); // Add messages to the dependency array

  // useEffect(() => {
  //   console.log(`save the message: ${saveNewMessage}`);
  //   function getLatestMessage() {
  //     return messages[messages.length - 1];
  //   }

  //   const saveMessages = async () => {
  //     let newMessage = getLatestMessage();
  //     console.log(newMessage);
  //     try {
  //       const response = await axios.patch(
  //         `http://localhost:8001/chats/${room}`,
  //         { newMessage },
  //         { withCredentials: true }
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   if (saveNewMessage) {
  //     saveMessages();
  //     setSaveNewMessage(false);
  //   }
  // }, [saveNewMessage]);

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
        // console.log(url);
        try {
          const response = await axios.get(url, { withCredentials: true });
          // console.log(response);

          setChats(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchChat();
    }
  }, [userData]);

  return (
    <section className="flex w-full h-screen justify-start antialiased text-gray-600 p-4 pb-24 ">
      <div className=" flex ">
        <ChatSideBar chats={chats} />
      </div>
      <div className="flex flex-col  w-full mx-9 shadow-lg rounded-lg">
        <div className="flex-1 overflow-y-scroll border-gray-200 dark:bg-gray-800">
          {messages.map((message, index) => {
            // console.log(message);
            return <ChatBubble key={index} message={message}></ChatBubble>;
          })}
        </div>
        <ChatInput />
      </div>
    </section>
  );
};

export default ChatWindow;

// console.log(message);
//           // setMessages([...messages, message]);
//           setMessages((prevMessages) => {
//             const newMessages = [...prevMessages, message];
//             console.log("New messages:", newMessages);
//             return newMessages;
//           });
