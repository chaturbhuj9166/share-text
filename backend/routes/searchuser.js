import express from "express";
import { searchUser } from "../controllers/searchUser.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();
    
router.post("/number", authMiddleware, searchUser);

export default router;