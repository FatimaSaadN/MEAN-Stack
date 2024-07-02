//import user
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
//export getAlluser using const
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return next(CreateSuccess(200, "All Users", users));
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }

}
//export getUserById using const
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        //if not user
        if (!user) {
            return next(createError(404, "User not found"));
        } else {
            return next(CreateSuccess(200, "User Found", user));
        }
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }
}