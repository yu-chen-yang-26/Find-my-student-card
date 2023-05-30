/* we use express^5.0.0-beta.1. 
When facing error, it will automatically catch it and call next(err)*/
import express from "express";
import cors from "cors";
import { getAllItems, addItem } from "./database.js";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const items = await getAllItems();
  res.send({ dataList: items });
});

app.get("/search", async (req, res) => {
  console.log("GET /search Request");
});

app.get("/detail", async (req, res) => {
  console.log("GET /detail Request");
});

app.post("/upload", async (req, res) => {
  const {
    category,
    discoverer,
    location_discovered,
    location_retrieve,
    owner_candidate,
    description,
  } = req.body;
  const note = await addItem(
    category,
    discoverer,
    location_discovered,
    location_retrieve,
    owner_candidate,
    description
  );
});

/* universal error handler */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    msg: err.message,
    success: false,
  });
});

app.listen(8080, () => {
  console.log("server running on PORT 8080");
});
