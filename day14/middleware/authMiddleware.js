import jwt from "jsonwebtoken";
import AppError from "../AppError.js";

export default function authMiddleware(req, res, next) {
    //req.headers (plural) not req.header
    const authHeader = req.headers.authorization;        // reading token from header

    if(!authHeader){
        return next(new AppError(404, "Token Missing"));      // if header not found then implemented error handling
    }

    const token = authHeader.split(" ")[1];             // spliting the header and taking only token from the header

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)    // verifying token from jwt and implemented proper error handling.
        req.body = decode;
        next();

    }catch(err){
        if (err.name === "TokenExpiredError"){
            return next(new AppError(401, "Token expired, please login again"));
        }

        return next(new AppError(401, "Invalid token"));
    }

}