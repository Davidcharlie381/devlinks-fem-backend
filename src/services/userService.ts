import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "./emailService";
import { io } from "../server";
import { User } from "../models/User";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  if (!(username && email && password)) {
    throw new Error("All fields are required.");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("Email is already taken.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    verificationToken,
  });

  await sendVerificationEmail(email, verificationToken);
  io.emit("new_user", { message: `New user registered: ${username}` });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  if (!(email && password)) {
    throw new Error("All fields are required.");
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("No user found.");
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    throw new Error("Incorrect password.");
  }

  return user;
};

export const updateDetails = async (
  username: string,
  lastName: string,
  email: string
) => {
  const user = await User.findOneAndUpdate(
    {
      email,
    },
    {
      username,
      lastName,
      email,
    }
  );
  return user;
};

export const verifyEmail = async (token: string) => {
  const user = await User.findOne( {verificationToken: token});
  if (!user) throw new Error("Invalid or expired token");

  await User.findOneAndUpdate(
    { id: user.id },
    { isVerified: true, verificationToken: null },
  );

  return user;
};
