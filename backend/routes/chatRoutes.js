import express from "express";
import { createOrGetChat } from "../controllers/chatController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/private", authMiddleware, createOrGetChat);

export default router;
