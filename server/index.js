import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { Configuration, OpenAIApi } from "openai";
import openAiRoutes from "./routes/openai.js";
import authRoutes from "./routes/auth.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


/* OPENAI CONFIGURATIONS */
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

/* ROUTES */
app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from VirtualSpeakz-AI!",
  });
});
app.use("/openai", openAiRoutes);
app.use("/auth", authRoutes);


/* SERVER SETUP */
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
