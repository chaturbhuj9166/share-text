import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import { connectToDB } from "./config/db.js";
import UserRouter from "./routes/UserRouter.js";
import shareRoutes from "./routes/shareRoutes.js";
import searchUser from "./routes/searchuser.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
connectToDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =======================
   ✅ CORS (SAFE & FLEXIBLE)
======================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://share-text-1.onrender.com",
  "https://share-text-eabo.onrender.com",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
}));

/* =======================
   ✅ MIDDLEWARES
======================= */
app.use(express.json());
app.use(cookieParser());

/* =======================
   ✅ API ROUTES
======================= */
app.use("/api/users", UserRouter);
app.use("/api/text", shareRoutes);
app.use("/api/search", searchUser);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);

/* =======================
   ✅ FRONTEND (VITE BUILD)
======================= */
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

/* =======================
   ✅ SPA FALLBACK
======================= */
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


/* =======================
   ✅ SERVER START
======================= */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
