import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white border-b">
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold cursor-pointer"
      >
        ShareText
      </h1>

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
