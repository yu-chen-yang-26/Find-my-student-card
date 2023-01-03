import { Router } from "express";
import {Card, Image} from '../models/schema';
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
    const data = await Card.find({});
    res.send({dataList: data});   
});

router.post('/upload', upload.single('file'), async (req, res) => {
    const id = await new Image({
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
    }).save();
    res.json({
      id: id._id
    })
});
router.post('/submit', async (req, res) => {
    console.log(req.body.params);
    res.send({message: 'hi'});   
});
export default router;