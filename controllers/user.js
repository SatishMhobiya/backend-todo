import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  const sendUsersData = users.map((user) => ({
    name: user.name,
    email: user.email,
  }));
  res.json({
    success: true,
    user: sendUsersData,
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let user;
  user = await User.findOne({ email: email });
  if (user) {
    res.json({
      success: false,
      message: "User Already Exists",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 15 * 60 * 1000),
  });

  res.json({
    success: true,
    token,
    message: "Register Successfully",
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user",
    });
  }
};

export const getUser = async (req, res) => {
  const { id, name, email } = req.body;
  if (id) {
    const user = await User.findById(id);
    if (user) {
      res.json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } else if (name) {
    const user = await User.findOne({ name: name });
    if (user) {
      res.json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } else if (email) {
    const user = await User.findOne({ email: email });
    if (user) {
      res.json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } else {
    res.json({
      success: false,
      message: "Invalid Request",
    });
  }
};
