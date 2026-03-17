import jwt from "jsonwebtoken";
import AppError from "../AppError.js";

const users = [
  { id: 1, username: "admin", password: "1234" }
];


export default function loginHandler(req, res, next) {
    try {
        const { username, password } = req.body;

        // Validate required fields
        if (!username || !password) {
            return next(new AppError(400, "Username and password are required"));
        }

        const user = users.find(
            u => u.username === username && u.password === password
        );

        if (!user) {
            return next(new AppError(401, "Invalid credentials"));
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "10m" } // Token expires in 1 minute
        );

        res.json({ token });
    } catch (err) {
        //Catch unexpected errors and pass to error handler
        next(err);
    }
}