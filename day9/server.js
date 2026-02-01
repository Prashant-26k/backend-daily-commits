import express from "express";

const app = express();
const PORT = 3000;

// Logging Middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Auth Middleware
const authCheck = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

app.use(logger);

// Public Route
app.get("/", (req, res) => {
  res.json({ message: "Public Route" });
});

// Protected Route
app.get("/dashboard", authCheck, (req, res) => {
  res.json({ message: "Protected Dashboard Access Granted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
