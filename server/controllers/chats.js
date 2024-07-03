import Chat from "../models/chatSchema.js";
import Client from "../models/clientsSchema.js";
import Pro from "../models/prosSchema.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const updateChat = async (req, res, next) => {
  const { id } = req.params;
  const { cid, body } = req;
  const { message } = body;

  try {
    const newMessage = {
      author_id: cid,
      text: message,
    };

    const updateChat = await Chat.findByIdAndUpdate(
      id,
      { $push: { messages: newMessage } },
      { new: true }
    );

    if (!updateChat) {
      throw { statusCode: 404 };
    }

    // Update the client's chat array
    const clientUpdate = await Client.findByIdAndUpdate(updateChat.client, {
      $pull: { chats: id },
    });
    await Client.findByIdAndUpdate(updateChat.client, {
      $push: { chats: id },
    });

    // Update the pro's chat array
    const proUpdate = await Pro.findByIdAndUpdate(updateChat.pro, {
      $pull: { chats: id },
    });
    await Pro.findByIdAndUpdate(updateChat.pro, {
      $push: { chats: id },
    });

    res.json(updateChat);
  } catch (error) {
    next(error);
  }
};
export const getChatByClientID = async (req, res, next) => {
  const { cid } = req;

  try {
    const chat = await Chat.find({ client: cid });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    next(error);
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
  const { cid, body } = req;
  const { client, task } = body;
  // const { client_id, pro_id, task_id } = req.body;

  const newChat = await Chat.create({ task: task, client: client, pro: cid });

  //Update the client's chat array
  const clientUpdate = await Client.findByIdAndUpdate(client, {
    $push: { chats: newChat._id },
  });

  //Update the pro's chat array
  const proUpdate = await Pro.findByIdAndUpdate(cid, {
    $push: { chats: newChat._id },
  });

  const populatedChat = await Chat.findById(newChat._id)
    .populate("client")
    .populate("task")
    .populate("pro");

  res.status(201).json(populatedChat);
});

export const deleteChat = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    cid,
  } = req;

  try {
    const found = await Chat.findById(id);
    console.log(found);
    console.log(cid);

    if (!found) throw new ErrorResponse(`Post ${id} does not exist`, 404);

    if (cid !== found.pro.toString() && cid !== found.client.toString())
      throw new ErrorResponse(
        "You have no permission to delete this post",
        401
      );

    await Chat.findByIdAndDelete(id);

    // Update the client's chat array
    await Client.findByIdAndUpdate(found.client, {
      $pull: { chats: id },
    });

    // Update the pro's chat array
    await Pro.findByIdAndUpdate(found.pro, {
      $pull: { chats: id },
    });

    res.json({ success: `Chat ${id} was deleted` });
  } catch (error) {
    next(error);
  }
});
