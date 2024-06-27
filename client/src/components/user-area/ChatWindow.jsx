import { useEffect, useState } from "react";
// import ChatInput from "./ChatInput";
// import ChatWindow from "./ChatWindow";
// import ChatBar from "./ChatBar";
import ChatSideBar from "./ChatSideBar";
import ChatInput from "./ChatInput";

const ChatWindow = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   console.log(socket);
  //   socket.emit("message", {
  //     text: "Hi here is Anon",
  //     name: "Anon",
  //     id: `${socket.id}${Math.random()}`,
  //     socketID: socket.id,
  //   });
  // }, []);

  //   useEffect(() => {
  //     socket.on("messageResponse", (data) => setMessages([...messages, data]));
  //   }, [socket, messages]);

  return (
    <section className="flex w-full h-screen justify-start antialiased text-gray-600 p-4 pb-24 ">
      <div className=" flex ">
        <ChatSideBar />
      </div>
      <div className="flex flex-col  w-full mx-9 shadow-lg rounded-lg">
        <div className="flex-1 overflow-y-scroll border-gray-200 dark:bg-gray-800"></div>
        <ChatInput />
      </div>
    </section>
  );
};

export default ChatWindow;
