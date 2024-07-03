import { useContext, useEffect, createContext, Children, useState } from "react";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({children}) => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket]= useState();
    const [room, setRoom]=useState("");
    return(
        <ChatContext.Provider value={{messages, setMessages, socket, setSocket, room, setRoom}}>
        {children}
        </ChatContext.Provider>
    )
}