import { Router } from "express";
import AppError from "./AppError.js";

const router = Router();

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  if (id !== "101") {
    return next(new AppError("User not found", 404));
  }

  res.json({ user: "Prashant" });
});

export default router;
