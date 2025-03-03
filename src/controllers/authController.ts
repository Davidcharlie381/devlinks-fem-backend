import { Request, Response } from "express";
import { registerUser, loginUser, verifyEmail } from "../services/userService";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    res
      .status(201)
      .json({ message: "User registered. Check your email for verification." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res
      .status(200)
      .json({ message: "Login successful", data: { user } });
  } catch (error) {}
};

export const verifyEmailHandler = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    await verifyEmail(token as string);
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
