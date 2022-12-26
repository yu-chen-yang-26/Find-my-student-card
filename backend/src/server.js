import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import mongo from './mongo';
import router from './routes/router.js';
import {Card, Mail} from './models/schema.js';
mongo.connect();

const app = express();
const server = http.createServer(app);
const db = mongoose.connection;
app.use(cors());
app.use(express.json());
app.use('/', router);

db.once('open', async () => {
    console.log('MongoDB connected!');
    await new Card(
        {ID: '1',
        location: '圖書館',
        info: 'test',
        time: '2022/12/10',
        founded: 'found',}).save();
    await new Card(
        {ID: '2',
        location: '圖書館',
        info: 'test',
        time: '2022/12/9',
        founded: 'Not yet',}).save();
    await new Card(
        {ID: '3',
        location: '社科院',
        info: 'test',
        time: '2022/12/11',
        founded: 'found',}).save();
    await new Card(
        {ID: '4',
        location: '圖書館',
        info: 'test',
        time: '2022/12/24',
        founded: 'Not yet',}).save();
    await new Card(
        {ID: '5',
        location: '社科院',
        info: 'test',
        time: '2022/12/25',
        founded: 'found',}).save();
})

const PORT = process.env.PORT || 4000;
server.listen(PORT, ()=>{console.log(`Server is listening to port ${PORT}`)});