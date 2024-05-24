import express from "express";
import { SignUp, SignIn, Google } from "../controllers/auth.controller.js";

const router = express.Router();

// SignUp:
router.post("/signup", SignUp);

// SignIn:
router.post("/signin", SignIn);

// Google OAuth:
router.post("/google", Google)

export default router;
