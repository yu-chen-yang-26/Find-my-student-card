import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import mongo from './mongo';
import router from './routes/router.js';
import {Card, Mail} from './models/schema.js';

mongo.connect();
const app = express();
app.options('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with');
    next()
})
const server = http.createServer(app);
const db = mongoose.connection;
app.use(cors());
app.use(express.json());
app.use('/', router);
db.once('open', async () => {
    console.log('MongoDB connected!');
})

const PORT = process.env.PORT || 4000;
server.listen(PORT, ()=>{console.log(`Server is listening to port ${PORT}`)});