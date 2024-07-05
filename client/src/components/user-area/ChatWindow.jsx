import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/UserProvider';
import { useChat } from '../../context/ChatProvider';
import socketIO from 'socket.io-client';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import ChatSideBar from './ChatSideBar';
import debounce from 'lodash/debounce';

const ChatWindow = () => {
  const { userData } = useAuth();
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

  const debouncedSaveMessages = useRef(
    debounce(async (messagesToSave, room, setSaveNewMessage) => {
      try {
        console.log('Saving messages to DB:', messagesToSave);
        await axios.patch(
          `http://localhost:8001/chats/${room}`,
          { messages: messagesToSave },
          { withCredentials: true }
        );
        setSaveNewMessage(false);
      } catch (error) {
        console.log(error);
      }
    }, 1000)
  ).current;

  useEffect(() => {
    const s = socketIO.connect('http://localhost:3000');
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      console.log('Socket is connected');
      socket
        .on('recieve-message', (message) => {
          console.log('Received message:', message);
          setMessages((prevMessages) => [...prevMessages, message]);
          setSaveNewMessage(true);
        })
        .on('error', (error) => {
          console.error('Error handling recieve-message event:', error);
        });
    } else {
      console.log('Socket is not connected');
    }
  }, [socket, setMessages, setSaveNewMessage]);

  useEffect(() => {
    if (saveNewMessage) {
      debouncedSaveMessages(messages, room, setSaveNewMessage);
    }
  }, [
    messages,
    saveNewMessage,
    room,
    debouncedSaveMessages,
    setSaveNewMessage,
  ]);

  useEffect(() => {
    if (userData) {
      const fetchChat = async () => {
        let url =
          userData.data && userData.data.role === 'client'
            ? `http://localhost:8001/chats/client_chat/`
            : `http://localhost:8001/chats/pro_chat/`;

        try {
          const response = await axios.get(url, { withCredentials: true });
          setChats(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchChat();
    }
  }, [userData]);

  return (
    <section className='flex w-full h-screen justify-start antialiased text-gray-600 p-4 pb-24'>
      <div className='flex'>
        <ChatSideBar chats={chats} />
      </div>
      <div className='flex flex-col w-full mx-9 shadow-lg rounded-lg'>
        <div className='flex-1 overflow-y-scroll border-gray-200 dark:bg-gray-800'>
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message} />
          ))}
        </div>
        <ChatInput />
      </div>
    </section>
  );
};

export default ChatWindow;
