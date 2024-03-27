import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const requireLogin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(req.headers);

  const token = authHeader.split(" ")[1];

  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userId = decoded._id;

    const user = User.findById(userId);

    if (user === null || !user) {
      return res.status(404).json({ error: "User not found." });
    }

    // res.status(200).json({ error: "User Authorized" })

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};
