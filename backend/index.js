// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { connectToDB } from "./config/db.js";
// import UserRouter from "./routes/UserRouter.js";

// dotenv.config();
// connectToDB();

// const app = express();
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/users", UserRouter);

// app.listen(4000, () => console.log("🚀 Backend running"));


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/db.js";

import UserRouter from "./routes/UserRouter.js";
import shareRoutes from "./routes/shareRoutes.js";
import searchUser from "./routes/searchuser.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
connectToDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", UserRouter);
app.use("/api/text", shareRoutes);
app.use("/api/search", searchUser);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Backend running on port ${process.env.PORT}`);
});

