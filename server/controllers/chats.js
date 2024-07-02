import Chat from "../models/chatSchema.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const updateChat = async (req, res, next) => {
  const {id} = req.params;
  const { cid, body } = req;
  const { messages } = body;
  console.log(cid)
  console.log(messages)
  try {
    const updateChat = await Chat.findByIdAndUpdate(
      id,
      {messages:messages },
      { new: true }
    );

    if (!updateChat) {
      throw { statusCode: 404 };
    }

    res.json(updateChat);
  } catch (error) {
    next(error)
  }
};

export const getChatByClientID = async (req, res, next) => {
  const { cid } = req;
  
  try {
    const chat = await Chat.find({ client: cid });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    next(error)
  }
};

export const getChatByProID = async (req, res, next) => {
  const { cid } = req;
  try {
    const chat = await Chat.find({ pro: cid });
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
export const createNewChat = asyncHandler(async (req, res, next) => {
  const {cid, body} = req;
  const {client, task} = body;
  // const { client_id, pro_id, task_id } = req.body;

  const newChat = await Chat.create({task:task, client: client, pro: cid})

  const populatedChat = await Chat.findById(newChat._id)
  .populate('client')
  .populate('task')
  .populate('pro');

  res.status(201).json(populatedChat);

});

export const deleteChat = asyncHandler(async (req, res, next)=>{
  const {
    params : {id},
    cid
  } = req;

  const found = Chat.findById(id);

  if (!found) throw new ErrorResponse(`Post ${id} does not exist`, 404);

  if (cid !== found.client_id.toString())
    throw new ErrorResponse('You have no permission to delete this post', 401);

  await Chat.findByIdAndDelete(id, body, {new:true}).populate('client');
  res.json({success: `Post ${id} was deleted`});

})