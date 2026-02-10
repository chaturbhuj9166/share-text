import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import { getIO } from "../config/socket.js";

// send message
export const sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;

    // 🔐 AUTH CHECK (IMPORTANT)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!chatId || !text) {
      return res.status(400).json({ message: "chatId & text required" });
    }

    // 🧠 CHAT EXIST CHECK
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const message = await Message.create({
      chatId,
      sender: req.user.id,
      text,
    });

    chat.lastMessage = text;
    await chat.save();

    // 🔥 SOCKET.IO (SAFE EMIT)
    try {
      const io = getIO();
      io.to(chatId).emit("receive_message", {
        _id: message._id,
        chatId,
        sender: req.user.id,
        text,
        createdAt: message.createdAt,
      });
    } catch (e) {
      console.log("⚠️ Socket not initialized, emit skipped");
    }

    res.status(201).json(message);
  } catch (error) {
    console.error("SEND MESSAGE ERROR:", error);
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
