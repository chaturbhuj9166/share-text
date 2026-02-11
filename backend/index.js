import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";

import { connectToDB } from "./config/db.js";
import UserRouter from "./routes/UserRouter.js";
import shareRoutes from "./routes/shareRoutes.js";
import searchUser from "./routes/searchuser.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =======================
   ✅ CORS CONFIGURATION
======================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://share-text-eabo.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

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
   🔥 SOCKET.IO SETUP
======================= */
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
    console.log(`👥 Joined chat: ${chatId}`);
  });

  socket.on("send_message", (data) => {
    console.log("📩 Message received:", data);
    io.to(data.chatId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});



/* =======================
   ✅ SERVER START
======================= */
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectToDB();
    server.listen(PORT, () => {
      console.log(`🚀 Backend + Socket.IO running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
