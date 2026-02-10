import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import { getIO } from "../config/socket.js";

// send message
export const sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;

    if (!chatId || !text) {
      return res.status(400).json({ message: "chatId & text required" });
    }

    const message = await Message.create({
      chatId,
      sender: req.user.id,
      text,
    });

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: text,
    });

    // 🔥 SOCKET.IO REAL-TIME EMIT
    const io = getIO();
    io.to(chatId).emit("receive_message", {
      _id: message._id,
      chatId,
      sender: req.user.id,
      text,
      createdAt: message.createdAt,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get messages of a chat
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId })
      .populate("sender", "name")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
