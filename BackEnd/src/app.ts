import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoutes from "./routes/movies";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", movieRoutes);

export default app;
