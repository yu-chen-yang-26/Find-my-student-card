import { Router } from "express";
import {Card} from '../models/schema';
const router = Router();

router.get("/", async (req, res) => {
    const data = await Card.find({});
    res.send({dataList: data});   
});

router.post("/upload", async (req, res) => {
    res.send('');
});
export default router;