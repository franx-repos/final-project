import { useEffect, useState } from "react";
import { useAuth } from "../../context/UserProvider";
import axios from "axios";

const ChatPartnerButton = ({ chat }) => {
  const { userData } = useAuth();
  const [entry, setEntry] = useState([]);

  useEffect(() => {
    const fetchChatPartner = async () => {
      let url = "";
      if (userData.data && userData.data.role === "client") {
        //pros als chatpartner fetchen
        url = `http://localhost:8001/pros/${chat.pro_id}`;
      } else {
        //clients als chatpartner fetchen
        url = `http://localhost:8001/clients/${chat.client_id}`;
      }

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

  // useEffect(() => {
  //   console.log(entry);
  // }, [entry]);

  return (
    <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
      <div className="flex items-center">
        <img
          className="rounded-full items-start flex-shrink-0 mr-3"
          src={entry.image_url && entry.image_url}
          width="32"
          height="32"
          alt="Marie Zulfikar"
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
