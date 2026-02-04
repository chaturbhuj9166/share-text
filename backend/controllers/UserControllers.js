// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//   const hash = await bcrypt.hash(req.body.password, 10);
//   await User.create({ ...req.body, password: hash });
//   res.json({ message: "Registered" });
// };

// export const login = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   const ok = await bcrypt.compare(req.body.password, user.password);
//   if (!ok) return res.status(401).json({ message: "Invalid" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.cookie("user_token", token, { httpOnly: true });
//   res.json({ message: "Logged in" });
// };

// export const logout = (req, res) => {
//   res.clearCookie("user_token");
//   res.json({ message: "Logged out" });
// };



import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({ ...req.body, password: hash });
  res.json({ message: "Registered successfully" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ message: "User not found" });

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.cookie("user_token", token, {
    httpOnly: true,
    sameSite: "strict"
  });

  res.json({ message: "Logged in" });
};

export const logout = (req, res) => {
  res.clearCookie("user_token");
  res.json({ message: "Logged out" });
};

