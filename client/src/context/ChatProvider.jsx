import {
  useContext,
  useEffect,
  createContext,
  Children,
  useState,
} from "react";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [room, setRoom] = useState("");
  const [saveNewMessage, setSaveNewMessage] = useState(false);
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
