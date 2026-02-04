import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { shareText ,recivetext} from "../controllers/shareController.js";

const router = express.Router();

router.post("/share", authMiddleware, shareText);

router.get("/recive/:slug",authMiddleware, recivetext);

export default router;


