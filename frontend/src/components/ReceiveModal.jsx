import { useState } from "react";
import API from "../api/axios";

export default function ReceivePage() {
  const [slug, setSlug] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleReceive = async () => {
    if (!slug.trim()) return alert("Slug required");

    try {
      setLoading(true);
      const res = await API.get(`/text/recive/${slug}`);
      setText(res.data.text);
      setCopied(false); // reset copy state
    } catch {
      alert("Invalid slug");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Receive Text
        </h2>

        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Paste slug here..."
          className="w-full border rounded-lg p-3 mb-4"
        />

        <button
          onClick={handleReceive}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
        >
          {loading ? "Loading..." : "Receive"}
        </button>

        {text && (
          <>
            <textarea
              readOnly
              value={text}
              className="w-full h-48 border rounded-lg p-3 mt-4 bg-slate-50"
            />

            <button
              onClick={handleCopy}
              className={`w-full mt-3 py-2 rounded-lg ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-slate-800 text-white hover:bg-slate-900"
              }`}
            >
              {copied ? "Copied ✔" : "Copy Text"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
