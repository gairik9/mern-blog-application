import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { ErrorHandler } from "../utils/error.js";

export const SignUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // return res.status(400).json({ message: "All fields are required." });
    next(ErrorHandler(400, "All Fields Are Required."));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({ message: "User Registered Successfully!" });
  } catch (error) {
    next(error);
  }
};
