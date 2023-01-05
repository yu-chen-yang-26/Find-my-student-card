import { Router } from "express";
import {Card, Image, Mail} from '../models/schema';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
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

router.get('/search', async (req, res) => {
    if (req.query.ID === '') {
        await Card.find({}).exec(function(err, data){
            if (err) {
                res.status(403).send({dataList: [] });
            }else{
                res.status(200).send({dataList: data });
            }
        });
    }else{
        await Card.find({ID: req.query.ID}).exec(function(err, data){
            if (err) {
                res.status(403).send({dataList: [] });
            }else{
                res.status(200).send({dataList: data });
            }
        });
    }
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
var jsonParser = bodyParser.json()
router.post('/submit',jsonParser, async (req, res) => {
    await new Card({...req.body.params,
        founded: 'Not yet'}).save();
    res.json({message: 'success',SendPermition : true});
});

router.post('/sendMail',jsonParser, async (req, res) => {
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
            if (data.image) {
                for (let index = 0; index < data.image.length; index++) {
                    let element = data.image[index];
                    let temp = await Image.findOne({_id: element});
                    imageList = [...imageList, "data:image/"+temp.img.contentType+";base64,"+
                    temp.img.data.toString('base64')];
                }   
            }       
            res.status(200).send({dataList: data, imageList: imageList });
        }
    });
});

router.post('/checkPassword',jsonParser, async (req, res) => {
    await Mail.findOne({ID: req.body.params.ID, info: req.body.params.location+' '+req.body.params.time})
    .exec(async function(err, data){
        if (err) {
            res.status(403).send({messages: 'error'});
        }else{     
            if (data.checkPassword === parseInt(req.body.params.password)) {
                await Card.updateOne({ID: req.body.params.ID, time: req.body.params.time, location: req.body.params.location},
                    {founded: 'True'})
                    .then(() => res.status(200).send({messages: 'correct'}))
                    .catch(err => {
                        console.log(err);
                        res.status(403).send({messages: 'error'});})
            }else{
                res.status(200).send({messages: 'wrong'});
            }
        }
    });
});
export default router;