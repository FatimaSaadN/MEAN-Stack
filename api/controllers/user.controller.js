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
export const updateUser = async (req, res, next) => {
    try {
        // Log the ID being used
        console.log("Updating user with ID:", req.query.id); 

        // Find the user by ID
        const user = await User.findById(req.query.id);
        if (user) {
            console.log("User found, updating data...");

            // Update the user data
            const newData = await User.findByIdAndUpdate(
                req.query.id,
                { $set: req.body },
                { new: true }
            );

            console.log("User updated successfully:", newData);
            return res.send("User Updated!");
        } else {
            return res.status(400).send("Bad Request - User not found!");
        }
    } catch (error) {
        console.error("Error updating user:", error); // Log the error
        return res.status(500).send("Internal Server Error!");
    }
};

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