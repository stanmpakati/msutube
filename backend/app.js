import express from "express";
import path from "path";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/videos.js";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/images", express.static(path.join("images")));

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
  next();
});

app.get("/", (req, res) => res.send("Hello Weirdo"));

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/video", videoRoutes);
