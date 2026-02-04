// import jwt from "jsonwebtoken";

// export default (req, res, next) => {
//   const token = req.cookies.user_token;
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   req.user = jwt.verify(token, process.env.JWT_SECRET);
//   next();
// };


import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.user_token;

  if (!token) {
    return res.status(401).json({ message: "Login required" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;


//api/text/recive/grId-H

