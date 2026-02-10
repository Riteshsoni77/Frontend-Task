// filepath: /Users/riteshsoni/Desktop/frontend task /backend/middleware/auth.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key"; // Replace with your secure key

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded token (userId) to the request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};