import express from "express";
import router from "./routes.js";
import errorHandler from "./errorHandler.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// mount routes
app.use("/user", router);

// error handler MUST be last
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
