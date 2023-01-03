import { Router } from "express";
import {Card, Image, Mail} from '../models/schema';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/uploads/'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    await Card.find({}).exec(function(err, data){
        if (err) {
            res.status(403).send({dataList: [] });
        }else{
            res.status(200).send({dataList: data });
        }
    });
});

router.post('/upload', upload.single('file'), async (req, res) => {
    const id = await new Image({
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
    }).save();
    res.json({id: id._id});
});

router.post('/submit', async (req, res) => {
    await new Card({...req.body.params,
        founded: 'Not yet'}).save();
    res.json({message: 'success',SendPermition : true});
});

router.post('/sendMail', async (req, res) => {
    await new Mail({...req.body.params}).save();
    res.json({message: 'success'});
});

router.get('/detail', async (req, res) => {
    await Card.findOne({ID: req.query.ID, time: req.query.time})
    .exec(async function(err, data){
        if (err) {
            res.status(403).send({dataList: [], imageList: [] });
        }else{
            let imageList = [];  
            for (let index = 0; index < data.image.length; index++) {
                const element = data.image[index];
                const temp = await Image.findOne({element});
                imageList = [...imageList, temp];
            }          
            res.status(200).send({dataList: data, imageList: imageList });
        }
    });
});
export default router;