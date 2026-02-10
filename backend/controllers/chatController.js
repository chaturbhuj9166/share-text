import Chat from "../models/Chat.js";

// create or get private chat
export const createOrGetChat = async (req, res) => {
  try {
    const { userId } = req.body; // jis se chat karni hai
    const myId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    let chat = await Chat.findOne({
      members: { $all: [myId, userId] },
    });

    if (!chat) {
      chat = await Chat.create({
        members: [myId, userId],
      });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
