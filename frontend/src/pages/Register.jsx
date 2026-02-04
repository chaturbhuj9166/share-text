import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users/register", form);
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 p-6 shadow rounded bg-white">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          className="input w-full mb-3"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          className="input w-full mb-3"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="input w-full mb-3"
          name="number"
          placeholder="Number"
          onChange={handleChange}
        />

        <input
          className="input w-full mb-3"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="btn w-full mt-2">Register</button>

        {/* 👇 Login Link */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
