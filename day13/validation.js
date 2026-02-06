import express from 'express';

const app = express();

app.use(express.json());


function validateUser(email, password) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Invalid Email";
  }

  if (!password || password.length < 8) {
    return "Password too short";
  }

  return null;
}

function sanitize(input) {
  return input.replace(/[<>]/g, "");
}

app.post("/register", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const error = validateUser(email, password);
  if (error) {
    return res.status(400).json({ error });
  }

  const safeEmail = sanitize(email);

  res.json({ message: "User Registered", email: safeEmail });
});


app.listen(3000, () => {
    console.log("Server is running");
});