import express from "express";
import dotenv from "dotenv";
import authMiddleware from './middleware/authMiddleware.js';
import errorHandler from "./middleware/errorHandler.js";
import logger from "./middleware/loggingMiddleware.js";
import loginHandler from "./routes/loginRoute.js";
import registerHandler from "./routes/registerRoute.js";
import itemHandler from "./routes/itemRoute.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(logger);
//Pass handler function directly to route
app.post('/login', loginHandler);
app.post('/register', registerHandler);
app.get('/item', authMiddleware, itemHandler);


app.use(errorHandler);

app.listen(process.env.PORT,() => {
    console.log(`Server running on Port ${process.env.PORT}`)
})


