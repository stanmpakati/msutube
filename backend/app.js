import express from "express";
import path from "path";
import cors from "cors";

// import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/_uploads", express.static(path.join("_uploads")));

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
  next();
});

app.get("/", (req, res) => res.send("Hello Weirdo, Your server is working"));

// app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/video", postRoutes);
