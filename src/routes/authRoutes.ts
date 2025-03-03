import express from "express";
import { register, login, verifyEmailHandler } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmailHandler);

export default router;
