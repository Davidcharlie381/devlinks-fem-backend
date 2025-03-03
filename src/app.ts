import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/database";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use(errorHandler);

export default app;
