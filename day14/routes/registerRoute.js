import AppError from "../AppError.js";


function validateUser(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // CORRECT: Return error object instead of calling next()
    if(!emailRegex.test(email)){
        return new AppError(400, "Invalid Email");
    }

    if(!password || password.length < 8){
        return new AppError(400, "Password too short");
    }

    return null;
}

function sanitize(input){
    return input.replace(/[<>]/g, "");
}


export default function registerHandler(req, res, next) {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return next(new AppError(400, "Missing Fields"));
        }
     
        // Validation function returns error or null
        const error = validateUser(email, password);
        if(error){
            return next(error); 
        }

        const safeEmail = sanitize(email);
        res.json({ message: "User Registered", email: safeEmail });
    } catch (err) {
        // Catch unexpected errors and pass to error handler
        next(err);
    }
}




