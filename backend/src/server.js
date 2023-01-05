import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import mongo from './mongo';
import path from "path";
import router from './routes/router.js';
const app = express();

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
  }
  
  if (process.env.NODE_ENV === "development") {
      app.use(cors());
  }
  
mongo.connect();
app.options('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with');
    next()
})
const server = http.createServer(app);
const db = mongoose.connection;
app.use(cors());
app.use('/api', router);
app.use(express.json());
db.once('open', async () => {
    console.log('MongoDB connected!');
})
const PORT = process.env.PORT || 4000;
server.listen(PORT, ()=>{console.log(`Server is listening to port ${PORT}`)});