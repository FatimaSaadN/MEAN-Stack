import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const searchUsers = async (req, res, next) => {
    const { query } = req.query;

    try {
        const users = await User.find(
            { $text: { $search: query } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        if (users.length === 0) {
            return next(createError(404, "No users found"));
        }

        return next(CreateSuccess(200, "Users Found", users));
    } catch (error) {
        return next(createError(500, "Internal Server Error" + error.toString()));
    }
};
