import express from "express";
import {
  createOrGetChat,
  getChatById
} from "../controllers/chatController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔹 Create or Get Private Chat
router.post("/private", authMiddleware, createOrGetChat);

// 🔥 Get Chat Details
router.get("/:chatId", authMiddleware, getChatById);

export default router;