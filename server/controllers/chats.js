import Chat from "../models/chatSchema.js";

//Über die Task Id werden die messages geholt
//Wenn ein user einem Chatroom joined
// export const getChatRoomByTaskId = async (req, res, next) => {
//   const { task_id } = req.params;

//   try {
//     const room = await Chat.find({ task_id: task_id });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const updateChat = async (req, res, next) => {
  const { id } = req.params;
  const { client_name, pro_name, task_name, messages } = req.body;
  try {
    const updateChat = await Chat.findByIdAndUpdate(
      id,
      { client_name, pro_name, task_name, messages },
      { new: true }
    );

    if (!updateChat) {
      throw { statusCode: 404 };
    }

    res.json(updateChat);
  } catch (error) {}
};

export const getChatByClientID = async (req, res, next) => {
  const { client_id } = req.params;
  try {
    const chat = await Chat.find({ client_id: client_id });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
  }
};

export const getChatById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findById(id);
    if (!chat) {
      throw { statusCode: 404, message: "Chat not found" };
    }
    res.json(chat);
  } catch (error) {}
};

//Diese Funktion kann dazu genutzt werden um alle Chats zu suchen
//
export const getAllChats = async (req, res, next) => {
  try {
    const chat = await Chat.find();
    if (!chat.length) {
      throw { statusCode: 404, message: "Chats not found" };
    }
    res.status(200).json(chat);
  } catch (error) {}
};

//Create a Chatroom this happens automatically as a professional and client connect
export const createNewChat = async (req, res, next) => {
  const { client_id, pro_id, task_id } = req.body;
  try {
    const newChat = new Chat({ client_id, pro_id, task_id });
    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    next(error.message);
  }
};
