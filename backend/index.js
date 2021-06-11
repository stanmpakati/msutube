import mongoose from "mongoose";
import { app } from "./app.js";

const port = process.env.PORT || "5000";
app.set("port", port);

mongoose
  .connect(
    `mongodb+srv://stan:${process.env.MONGO_ATLAS_PW}@cluster0.eexsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => console.log(`Running on http://localhost:${port}`));
  })
  .catch((e) => console.log(`Error connecting to the database: ${e.message}`));
