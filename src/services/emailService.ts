import nodemailer from "nodemailer";
import { config } from "../config/env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `http://localhost:5000/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: `"MyApp" <${config.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  };

  return transporter.sendMail(mailOptions);
};
