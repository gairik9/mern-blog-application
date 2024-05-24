import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { ErrorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// SignUp Function :
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

// SignIn Function :
export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(ErrorHandler(400, "All Fields Are Required."));
  }

  try {
    const isValidUser = await User.findOne({ email });

    if (!isValidUser) {
      return next(ErrorHandler(404, "User Not Found."));
    }

    const isValidPassword = bcryptjs.compareSync(
      password,
      isValidUser.password
    );

    if (!isValidPassword) {
      return next(ErrorHandler(400, "Invalid Password!"));
    }

    const token = jwt.sign(
      {
        id: isValidUser._id,
      },
      process.env.JWT__SECRET__KEY
    );

    // Hide The password/hashed_Password from response :
    const { password: pass, ...rest } = isValidUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// SignIn using Google :
export const Google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email })

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT__SECRET__KEY);
      const { password, ...rest } = user._doc;
      res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest)
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl
      });
      await newUser.save();
      const { password, ...rest } = newUser._doc;
      res.status(200).cookie('access_token', token, {
        httpOnly: true
      }).json(rest);
    }
  } catch (error) {
    next(error);
  }
};
