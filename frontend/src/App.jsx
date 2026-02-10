import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import ReceiveModal from "./components/ReceiveModal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <Routes>
      {/* ❌ NO HEADER / FOOTER */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ✅ HEADER + FOOTER */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/receive" element={<ReceiveModal />} />
          <Route path="/chat/:chatId" element={<Chat />} />
      </Route>
    </Routes>
  );
}
