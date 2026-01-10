import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDB } from "./database/db.js";
const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use("/", (req, res) => {
  return res.status(200).json({
    success: true,
    msg: "api is working",
  });
});

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    throw new Error(error.message);
  });
