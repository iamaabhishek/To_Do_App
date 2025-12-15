import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import todoRoute from "./routes/Todo.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config({ quiet: true });

const app = express();
const port = process.env.PORT || 4000;
const DB_URL = process.env.MONGODB_URL;

// middleware (MUST be before routes)
app.use(express.json());

// routes
app.use("/todo", todoRoute);
app.use("/user",userRoute);









// connect DB & start server
mongoose.connect(DB_URL)
  .then(() => {
    console.log("Connected To MongoDB");

    app.listen(port, () => {
      console.log(`Server running → http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed 👉", error.message);
    process.exit(1); // stop app if DB fails
  });
