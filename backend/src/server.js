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
<<<<<<< Updated upstream
    await new Card(
        {ID: 'r10521314',
        location: '圖書館',
        info: 'test',
        position: { lat: 25.018980966640957, lng: 121.5430102369873 },
        time: '2022-12-01',
        founded: 'found',}).save();
    await new Card(
        {ID: 'r10521327',
        location: '圖書館',
        info: 'test',
        position: { lat: 25.0175809726526, lng: 121.542570355 },
        time: '2022-12-11',
        founded: 'Not yet',}).save();
    await new Card(
        {ID: 'r10323003',
        location: '社科院',
        info: 'test',
        position: { lat: 25.0175809726526, lng: 121.54213047243042 },
        time: '2022-12-21',
        founded: 'found',}).save();
=======
    // await new Card(
    //     {ID: '1',
    //     location: '圖書館',
    //     info: 'test',
    //     time: '2022-12-10',
    //     founded: 'found',}).save();
    // await new Card(
    //     {ID: '2',
    //     location: '圖書館',
    //     info: 'test',
    //     time: '2022-12-9',
    //     founded: 'Not yet',}).save();
    // await new Card(
    //     {ID: '3',
    //     location: '社科院',
    //     info: 'test',
    //     time: '2022-12-11',
    //     founded: 'found',}).save();
    // await new Card(
    //     {ID: '4',
    //     location: '圖書館',
    //     info: 'test',
    //     time: '2022-12-24',
    //     founded: 'Not yet',}).save();
    // await new Card(
    //     {ID: '5',
    //     location: '社科院',
    //     info: 'test',
    //     time: '2022-12-25',
    //     founded: 'found',}).save();
>>>>>>> Stashed changes
})

const PORT = process.env.PORT || 4000;
server.listen(PORT, ()=>{console.log(`Server is listening to port ${PORT}`)});