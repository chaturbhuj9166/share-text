import Chat from "../models/Chat.js";

// 🔹 CREATE OR GET CHAT (Already hai tumhara)

export const createOrGetChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const myId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    let chat = await Chat.findOne({
      members: { $all: [myId, userId] },
    }).populate("members", "name phone");

    if (!chat) {
      chat = await Chat.create({
        members: [myId, userId],
      });

      chat = await chat.populate("members", "name phone");
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔥 NEW — GET CHAT BY ID
export const getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId)
      .populate("members", "name phone");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};