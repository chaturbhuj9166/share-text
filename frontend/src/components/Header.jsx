import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();

  const [number, setNumber] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchUser = async () => {
    if (!number.trim()) {
      toast.warning("Enter number");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/search/number", { number });
      setFoundUser(res.data);
    } catch {
      setFoundUser(null);
      toast.error("User not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white border-b relative">
      {/* LOGO */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold cursor-pointer"
      >
        ShareText
      </h1>

      {/* SEARCH */}
      <div className="relative w-[420px]">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchUser()}
            className="border px-3 py-2 rounded-lg outline-none w-full"
          />

          <button
            onClick={searchUser}
            disabled={loading}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        {/* 🔥 RESULT BOX */}
        {foundUser && (
          <div className="absolute top-12 left-0 w-full bg-white border rounded-xl shadow-lg p-3 flex items-center justify-between">
            {/* USER INFO */}
            <div>
              <p className="font-semibold text-sm">
                {foundUser.name}
              </p>
              <p className="text-xs text-gray-500">
                {foundUser.number}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">
             <button
  onClick={async () => {
    const res = await API.post("/chat/private", {
      userId: foundUser._id,
    });
    navigate(`/chat/${res.data._id}`);
    setFoundUser(null);
    setNumber("");
  }}
  className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg"
>
  Chat
</button>

             <button
  onClick={() => {
    setFoundUser(null);
    setNumber("");
  }}
  className="text-gray-400 hover:text-black text-lg leading-none"
>
  ×
</button>

            </div>
          </div>
        )}
      </div>

      {/* RIGHT BUTTONS */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/receive")}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Receive
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 border rounded-lg"
        >
          Sign in
        </button>
      </div>
    </header>
  );
}
