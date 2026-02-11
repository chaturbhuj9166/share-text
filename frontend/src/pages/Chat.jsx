
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import socket from "../socket"; // ✅ NEW

export default function Chat() {
  const { chatId } = useParams();
  const location = useLocation();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [otherUser, setOtherUser] = useState(null);

  // 🔹 Load messages (REST)
  useEffect(() => {
    const loadMessages = async () => {
      const res = await API.get(`/messages/${chatId}`);
      setMessages(res.data);

      if (location.state?.otherUser) {
        setOtherUser(location.state.otherUser);
      } else if (res.data.length > 0) {
        const other = res.data.find(
          (m) => m.sender && m.sender._id !== res.data[0].sender._id
        );
        setOtherUser(other?.sender || res.data[0].sender);
      }
    };

    loadMessages();
  }, [chatId, location.state]);

  // 🔥 SOCKET.IO JOIN + RECEIVE
  useEffect(() => {
    if (!chatId) return;

    // join room
    socket.emit("join_chat", chatId);

    // receive real-time message
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [chatId]);

  // 🔹 Send message
  const sendMessage = async () => {
    if (!text.trim()) return;

    // REST → DB save
    const res = await API.post("/messages", {
      chatId,
      text,
    });

    // OPTIONAL: socket emit (agar REST emit nahi kar raha)
    socket.emit("send_message", {
      chatId,
      ...res.data,
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-100">

      {/* 🔝 CHAT HEADER */}
      <div className="h-14 bg-white border-b flex items-center px-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {otherUser?.name?.charAt(0) || "?"}
        </div>
        <div className="ml-3">
          <p className="font-semibold">{otherUser?.name || "Chat"}</p>
          <p className="text-xs text-gray-500">online</p>
        </div>
      </div>

      {/* 💬 MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => {
          const isMe = false; // later auth se fix

          return (
            <div
              key={msg._id}
              className={`max-w-[60%] px-3 py-2 rounded-lg text-sm ${
                isMe ? "ml-auto bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {msg.text}
            </div>
          );
        })}
      </div>

      {/* ⌨️ INPUT BAR */}
      <div className="h-14 bg-white border-t flex items-center px-4 gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          className="flex-1 border rounded-full px-4 py-2 outline-none"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-5 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
