import { useEffect, useState } from "react";
import { useAuth } from "../../context/UserProvider";
import axios from "axios";
import { useChat } from "../../context/ChatProvider";

const ChatPartnerButton = ({ chat }) => {
  const { userData } = useAuth();
  const { messages, setMessages, room, setRoom, socket } = useChat();
  const [entry, setEntry] = useState([]);

  useEffect(() => {
    const fetchChatPartner = async () => {
      let url = "";
      if (userData.data && userData.data.role === "client") {
        //pros als chatpartner fetchen
        url = `http://localhost:8001/pros/${chat.pro}`;
      } else {
        //clients als chatpartner fetchen
        url = `http://localhost:8001/clients/${chat.client}`;
      }
      // console.log(url);
      try {
        const response = await axios.get(url);
        // console.log(response);
        setEntry(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChatPartner();
  }, [chat]);

  useEffect(() => {
    if (socket && socket.connected && room !== "") {
      socket.emit("join-room", room);
    }
  }, [room]);

  function joinChat() {
    setMessages(chat.messages);
    setRoom(chat._id);
  }

  return (
    <button
      className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50"
      onClick={joinChat}
    >
      <div className="flex items-center">
        <img
          className="rounded-full items-start flex-shrink-0 mr-3"
          src={entry.image_url && entry.image_url}
          width="32"
          height="32"
        />
        <div>
          {entry.data && (
            <h4 className="text-sm font-semibold text-gray-900">
              {entry.data.first_name} {entry.data.last_name}
            </h4>
          )}
          {chat.messages && (
            <div className="text-[13px]">
              {chat.messages[chat.messages.length - 1].text}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default ChatPartnerButton;
