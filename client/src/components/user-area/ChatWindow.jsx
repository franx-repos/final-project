import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/UserProvider";

const deploy = import.meta.env.VITE_DEPLOY_URL;
import { useChat } from "../../context/ChatProvider";
import socketIO from "socket.io-client";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import ChatSideBar from "./ChatSideBar";
import debounce from "lodash/debounce";

const ChatWindow = () => {
  const { userData } = useAuth();
  const [isListenerSetup, setIsListenerSetup] = useState(false);

  const {
    messages,
    setMessages,
    socket,
    setSocket,
    room,
    saveNewMessage,
    setSaveNewMessage,
    chats, setChats,
    saveMessages
  } = useChat();

  useEffect(()=>{
    const fetchChat = async () => {
      let url = "";
      if (userData.data && userData.data.role === "client") {
        url = `${deploy}/chats/client_chat/`;
      } else {
        url = `${deploy}/chats/pro_chat/`;
      }
      console.log(url);
      try {
        const response = await axios.get(url, { withCredentials: true });
        setChats(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (userData) {
      
      console.log("fetching chat");
      fetchChat();
    }
  },[])

  useEffect(() => {
    console.log(chats);
  }, [chats]);


  // const debouncedSaveMessages = useRef(
  //   debounce(async (messagesToSave, room, setSaveNewMessage) => {
  //     // try {
  //     //   console.log("Saving messages to DB:", messagesToSave);
  //     //   await axios.patch(
  //     //     `${deploy}/chats/${room}`,
  //     //     { messages: messagesToSave },
  //     //     { withCredentials: true }
  //     //   );
  //     //   setSaveNewMessage(false);
  //     // } catch (error) {
  //     //   console.log(error);
  //     // }
  //     saveMessages(userData);
  //   }, 1000)
  // ).current;


  const debouncedSaveMessages = useRef(
    debounce(() => {
      saveMessages(userData);
    }, 1000)
  ).current;

  useEffect(() => {
    const s = socketIO.connect(`${deploy}`);
    setSocket(s);
    // return () => {
    //   socket.disconnect();
      
    // };
  }, []);

  useEffect(() => {
    console.log(socket);
  }, [socket]);

  // useEffect(() => {
  //   if (socket) {
  //     console.log("Socket is connected");
  //     socket
  //       .on("recieve-message", (message) => {
  //         console.log("Received message:", message);

  //         setMessages((prevMessages) => [...prevMessages, message]);
  //         // setSaveNewMessage(true);
  //       })
  //       .on("error", (error) => {
  //         console.error("Error handling recieve-message event:", error);
  //       });
  //   } else {
  //     console.log("Socket is not connected");
  //   }
  // }, [socket, setMessages, setSaveNewMessage]);


  //useEffect is trigerred whenever messages change to save them to the according room
  useEffect(()=>{
    if (room !== "" && messages.length > 0 && saveNewMessage) {
      saveMessages(userData);
    }
  },[saveNewMessage])

  useEffect(() => {
    if (socket && isListenerSetup === false) {
      console.log("Socket is connected");

      socket
        .on("recieve-message", (message) => {
          console.log("Received message:", message);

          setMessages((prevMessages) => [...prevMessages, message]);
          setSaveNewMessage(true);
        })
        .on("error", (error) => {
          console.error("Error handling recieve-message event:", error);
        });
      setIsListenerSetup(true);
    } else {
      console.log("Socket is not connected");
    }
  }, [socket, isListenerSetup]);

  //wenn man das auskommentiert werden die messages gesendet
  // useEffect(() => {
  //   if (saveNewMessage && messages.length>0) {
  //     debouncedSaveMessages();
  //   }
  // }, [
  //   messages,
  //   saveNewMessage,
  //   room,
  //   debouncedSaveMessages,
  //   setSaveNewMessage,
  // ]);

  useEffect(() => {
    if (userData) {
      const fetchChat = async () => {
        let url = "";
        if (userData.data && userData.data.role === "client") {
          url = `${deploy}/chats/client_chat/`;
        } else {
          url = `${deploy}/chats/pro_chat/`;
        }
        console.log(url);
        try {
          const response = await axios.get(url, { withCredentials: true });
          setChats(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      console.log("fetching chat");
      fetchChat();
    }
  }, [userData]);

  return (
    <section className="flex w-full h-screen justify-start antialiased text-gray-600 p-4 pb-24">
      <div className="flex">
        <ChatSideBar chats={chats} />
      </div>
      <div></div>
      {room ? (
        <div className="flex flex-col w-full mx-9 shadow-lg rounded-lg">
          <div className="flex-1 overflow-y-scroll border-gray-200 dark:bg-gray-800">
            {messages.map((message, index) => {
              console.log(message);
              if (message !== messages[index - 1]) {
                return <ChatBubble key={index} message={message} />;
              }
            })}
          </div>

          <ChatInput />
        </div>
      ) : (
        <div className="flex flex-col w-full mx-9 shadow-lg rounded-lg"></div>
      )}
    </section>
  );
};

export default ChatWindow;
