import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";



API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Please login first");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default function Dashboard() {

  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [slug, setSlug] = useState("");
  const [copied, setCopied] = useState(false);

  const createSlug = async () => {
    if (!text.trim()) {
      toast.warning("Text required");
      return;
    }

    try {
      const res = await API.post("/text/share", { text });
      setSlug(res.data.slug);
      setCopied(false);
      toast.success("Share created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(slug);
      setCopied(true);
      toast.success("Slug copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <main className="max-w-4xl mx-auto mt-16 px-4">
      <h2 className="text-4xl font-bold text-center">
        Share Text Instantly
      </h2>

      <div className="bg-white border rounded-xl mt-8 p-4">
        <textarea
          className="w-full h-56 outline-none resize-none"
          placeholder="Write or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={createSlug}
            className="bg-orange-500 text-white px-5 py-2 rounded-lg"
          >
            Create Share
          </button>
        </div>
      </div>

      {slug && (
        <div className="mt-6 bg-white border rounded-xl p-4 text-center">
          <p className="text-blue-600 font-semibold">{slug}</p>

          <button
            onClick={handleCopy}
            className="mt-3 px-4 py-2 rounded-lg bg-slate-800 text-white"
          >
            {copied ? "Copied ✔" : "Copy Slug"}
          </button>
        </div>
      )}
    </main>
  );
}
