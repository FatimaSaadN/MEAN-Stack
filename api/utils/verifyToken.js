import { createError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import jwt from 'jsonwebtoken';
export const verifyToken = async (req, res, next) => {
    //use cookies
    const token = req.cookies.access_token;
    //if not token use create error
    if (!token) {
        return next(createError(403, "A token is required for authentication"));
    }
    //jwt verify
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(createError(403, "Invalid token"));
        }
        req.user = user;
        next();
    });

}

//verify user
export const verifyUser = async (req, res, next) => {
    //if user is admin
    if (req.user.id !== req.params.id && !req.user.isAdmin) {
        next();
    }
    //if user not admin
    else {
        return next(createError(403, "You are not authorized to perform this action"));
    } 
}

//verify admin
export const verifyAdmin = async (req, res, next) => {
    //if user is admin
    if (req.user.isAdmin) {
        next();
    }
    //if user not admin
    else {
        return next(createError(403, "You are not authorized to perform this action"));
    }
}