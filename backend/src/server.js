import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { mongo_connect } from "./mongo.js";
import router from "./routes/router.js";

// activate dotenv
dotenv.config();
// express app
const app = express();

// connect mongo atlas
mongo_connect.connect(); // basically mongoose.connect(), but more configuration
const db = mongoose.connection; // observe the first connection
db.once("open", async () => {
  console.log("MongoDB connected!");
});
app.use(express.json());
app.use(cors());
app.use("/api", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
