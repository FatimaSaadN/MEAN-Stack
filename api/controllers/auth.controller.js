import Role from "../models/Role.js"
import User from "../models/User.js";
//import bcrypt
import bcrypt from 'bcryptjs';
//import mongoose
import mongoose from 'mongoose';
//import jwt
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { createError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const register = async (req, res, next)=>{
    //return next(createError(500, "My Error!"));
	const role = await Role.find({role: 'User'});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        roles: role
    });
    await newUser.save();
    res.status(201).json(CreateSuccess("User created successfully"));
    //return next(CreateSuccess(200, "User Registered!"))
}

export const registerAdmin = async (req, res, next)=>{
    //return next(createError(500, "My Error!"));
	const role = await Role.find({});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        isAdmin:true,
        roles: role
    });
    await newUser.save();
    return next(CreateSuccess(200, "Admin Registered!"))
}

//login
export const login = async (req, res, next)=>{
    console.log("ibbbiiii")
    try{
        const user = await User.findOne({email: req.body.email})
        .populate("roles", "role");
        const {roles} = user;

        if(!user){
            return res.status(404).json("User not found!");
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json("Invalid Password!");
        }
        //create token
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin, roles: roles}, process.env.JWT_SECRET);
        //return next(CreateSuccess(200, "User Logged In!!"))
        //send token in cookie
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({
            success: 200,
            message: "Login Success",
            data: { token, userId: user._id }  // Include user ID in the response
        });
    }
    catch(error){
        return res.status(500).send("Internal Server Error!")
    }

}

//logout token
export const logout = async (req, res, next)=>{
    res.clearCookie("access_token");
    return next(CreateSuccess(200, "User Logged Out!!"))
}