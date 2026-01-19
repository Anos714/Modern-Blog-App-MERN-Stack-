import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDB } from "./database/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { authRouter } from "./routes/auth.route.js";
import { blogRouter } from "./routes/blog.route.js";
import { commentRouter } from "./routes/comment.route.js";
import { adminRouter } from "./routes/admin.route.js";
const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://bit-blogs-omega.vercel.app", "http://localhost:8080"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

//routes

app.use("/api/user", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);
app.use("/api/admin", adminRouter);

app.use(errorHandler);

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
