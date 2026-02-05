import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authMiddleware from "./middleware/auth.js";

dotenv.config();
const app = express();

app.use(express.json());

const users = [
  { id: 1, username: "admin", password: "1234" }
];

// LOGIN ROUTE → ISSUE JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1m" } // Token expires in 1 minute
  );

  res.json({ token });
});

// PROTECTED ROUTE → VERIFY JWT
app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to protected route",
    user: req.user
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
