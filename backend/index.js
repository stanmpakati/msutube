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
    // Run on wifi to connect to mobile
    // app.listen(5002, "192.168.100.4", () => console.log(`Running on ip`));
    app.listen(port, () => console.log(`Running on http://localhost:${port}`));
  })
  .catch((e) => console.log(`Error connecting to the database: ${e.message}`));
