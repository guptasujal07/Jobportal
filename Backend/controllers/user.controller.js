import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../config/cloudinary.js";

import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        console.log("cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
        console.log("api key:", process.env.CLOUDINARY_API_KEY);
        console.log("api secret:", process.env.CLOUDINARY_API_SECRET);

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePhoto = "";
        console.log("req file", req.file);
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhoto = cloudResponse.secure_url;
        }

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto,
            },
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            message: "Internal server error during registration.",
            success: false,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with selected role.",
                success: false,
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true,
            });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Internal server error during login.",
            success: false,
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "Logged out successfully.",
                success: true,
            });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Internal server error during logout.",
            success: false,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false,
            });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(",");

        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = req.file.originalname;
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true,
        });
    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({
            message: "Internal server error during profile update.",
            success: false,
        });
    }
};
