//import user
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
//bcrypt
import bcrypt from "bcryptjs";
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

        // Find the user by ID
        const user = await User.findById(req.params.id);
        if (user) {

            // Update the user data
            const newData = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            return res.send("User Updated!");
        } else {
            return res.status(400).send("Bad Request - User not found!");
        }
    } catch (error) {
        console.error("Error updating user:", error); // Log the error
        return res.status(500).send("Internal Server Error!");
    }
};

//change hashed password
// export const changePassword = async (req, res, next) => {
//     try {

//         // Find the user by ID
//         const user = await User.findById(req.params.id);
//         if (user) {
//             // Change the password
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(req.body.password, salt);
//             const newData = await User.findByIdAndUpdate(
//                 req.params.id,
//                 { $set: { password: hashedPassword } },
//                 { new: true }
//             );
//             return res.send("Password Changed!");
//         } else {
//             return res.status(400).send("Bad Request - User not found!");
//         }
//     } catch (error) {
//         console.error("Error changing password:", error); // Log the error
//         return res.status(500).send("Internal Server Error!");
//     }
// };

// ok

export const changePassword = async (req, res, next) => {
    console.log("Inside change password function")
    try {
        // Log the ID being used
        console.log("Changing password for user with ID:", req.params.id);

        // Find the user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            console.log("User not found");
            return res.status(400).send("Bad Request - User not found!");
        }

        // Log the password before hashing
        console.log("Password before hashing:", req.body.newPassword);

        // Change the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

        // Log the hashed password
        console.log("Hashed Password:", hashedPassword);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        // Verify the password in the database
        const updatedUser = await User.findById(req.params.id);
        console.log("Updated User Password:", updatedUser.password);

        return res.send("Password Changed!");
    } catch (error) {
        console.error("Error changing password:", error); // Log the error
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