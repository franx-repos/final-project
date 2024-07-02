import { useContext, useEffect, createContext, Children, useState } from "react";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({children}) => {
    const [selectedChat, setSelectedChat] = useState("");

    return(
        <ChatContext.Provider value={{selectedChat, setSelectedChat}}>
        {children}
        </ChatContext.Provider>
    )
}