import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/getDataUri.js";

// Register logics-----------------------------------------------
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    console.log(fullname, email, phoneNumber, password, role);

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already existed with this email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// login logics-----------------------------------------------

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(email, password, role);

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "user is not registered!",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with corrent role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const userData = {
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
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true, // XSS attack
        sameSite: "strict", // CSRF attack
      })
      .json({
        message: `Welcome back ${userData.fullname}`,
        user: userData,
        success: true,
      });
  } catch (err) {
    console.log(err);
  }
};

// logout logic____________________
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully!",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// update logic ----------------------------
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; //later we use it  >> user.profile.resumeOriginalName = file.originalname;
    const userId = req.id; // middleware authentication

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // updating text fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;

    // updating skills
    if (skills) {
      const skillsArray =
        typeof skills === "string"
          ? skills.split(",").map((s) => s.trim())
          : skills.map((s) => s.trim());
      user.profile.skills = skillsArray;
    }

    // uploading resume if file exists
    if (file) {
      const fileUri = getDataUri(file);

      // { content: "data:application/pdf;base64,JVBERi0xLjcKJc..."  // long base64 string}

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      // cloudResponse = {
      //   public_id: "abc123",
      //   version: 1699999999,
      //   signature: "...",
      //   width: 800,
      //   height: 600,
      //   format: "pdf",
      //   resource_type: "raw",
      //   created_at: "2023-01-01T00:00:00Z",
      //   secure_url: "https://res.cloudinary.com/demo/abc123.pdf"
      // }

      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};
