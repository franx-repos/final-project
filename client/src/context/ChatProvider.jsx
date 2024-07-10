import {
  useContext,
  useEffect,
  createContext,
  Children,
  useState,
} from "react";

import axios from "axios";

const ChatContext = createContext();
const deploy = import.meta.env.VITE_DEPLOY_URL;

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [room, setRoom] = useState("");
  const [saveNewMessage, setSaveNewMessage] = useState(false);
  const [chats, setChats] = useState([])

  const fetchChat = async (userData) => {
    let url = "";
        if (userData.data && userData.data.role === "client") {
          url = `${deploy}/chats/client_chat/`;
        } else {
          url = `${deploy}/chats/pro_chat/`;
        }
         //console.log(url);
        try {
          const response = await axios.get(url, { withCredentials: true });
          setChats(response.data);
        } catch (error) {
          //console.log(error);
        }
  }

  const saveMessages = async (userData) => {
    const messagesToSave = messages;
    try {
      // console.log("Saving messages to DB:", messagesToSave);
      const response = await axios.patch(
        `${deploy}/chats/${room}`,
        { messages: messagesToSave },
        { withCredentials: true }
      );
       //console.log(response)
      if(response){
        fetchChat(userData);
        setSaveNewMessage(false);
      }
      
    } catch (error) {
     //  console.log(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        socket,
        setSocket,
        room,
        setRoom,
        saveNewMessage,
        setSaveNewMessage,
        chats, setChats,
        fetchChat, saveMessages
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
