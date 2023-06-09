import express from "express";
import { User, FoundItem, LostItem, Image } from "./schema.js";
import {
  queryFoundItems,
  queryFoundItemWithLostItem,
} from "./mongoose/query.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import verify from "./middleware.js";
const JWT_SECRET = "PUI-final-project-group9";
const router = express.Router();

// 還是不太懂 multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    let data = await FoundItem.find({})
      .sort({ time: "asc" })
      .select({ category: 1, found_location: 1, time: 1, remark: 1 })
      .exec();
    res.status(200).send({ dataList: data });
  } catch (error) {
    console.error(error.message);
    res.status(403).send({ dataList: [] });
  }
});

router.get("/search", verify, async (req, res) => {
  try {
    // parse the query string
    const { category, location, time, name, student_id, remark } = req.query;
    console.log(req.query);
    let startTime, endTime;
    if (time) {
      startTime = time;
      endTime = new Date(time);
      endTime.setDate(endTime.getDate() + 1);
    }
    const data = await queryFoundItems({
      category,
      location,
      startTime,
      endTime,
      name,
      student_id,
      remark,
    });
    res.status(200).send({ dataList: data });
  } catch (error) {
    console.error(error);
    res.status(403).send({ dataList: [] });
  }
});

// 完全不懂 upload 怎麼運作的，放著不動
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const id = await new Image({
      img: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.filename)
        ),
        contentType: req.file.mimetype,
      },
    }).save();
    res.json({ id: id._id });
  } catch (error) {
    console.error(error);
    res.status(400).json({ id: "" });
  }
});

router.post("/submit/foundItem", verify, async (req, res) => {
  let itemParam = req.body; // 吃一個 json / js object
  if (!itemParam.group) {
    itemParam.group = randomUUID();
  }
  try {
    const data = await FoundItem.create(itemParam); // mongoose 應該有偷偷做資料轉換
    res.json({
      message: "success",
      SendPermition: true,
      id: data._id,
      group: itemParam.group,
    });
  } catch (error) {
    console.error(error);
    res
      .status(405)
      .send({ message: "fail", SendPermition: false, id: "", group: "" });
  }
});

router.post("/submit/lostItem", verify, async (req, res) => {
  let itemParam = { ...req.body, mislayer: req.user };
  try {
    const data = await LostItem.create(itemParam); // mongoose 應該有偷偷做資料轉換
    res.json({
      message: "success",
      SendPermition: true,
      id: data._id,
    });
  } catch (error) {
    console.error(error);
    res.status(405).send({
      message: "fail",
      SendPermition: false,
      id: "",
    });
  }
});

router.get("/detail", verify, async (req, res) => {
  try {
    // query lost item with id
    const id = req.query.id;
    if (!id) {
      throw new Error("need query id");
    }
    const data = await FoundItem.findById(id).exec();
    if (!data) {
      throw new Error("invalid id");
    }
    // query image and assemble image
    let image = "";
    if (data.image) {
      let temp = await Image.findById(data.image).exec();
      image =
        "data:image/" +
        temp.img.contentType +
        ";base64," +
        temp.img.data.toString("base64");
    }
    // query lost item with queried groupId
    const { group } = data;
    let groupList = [];
    if (group) {
      groupList = await FoundItem.find({ group, _id: { $ne: id } })
        .sort({ time: "asc" })
        .select({
          category: 1,
          found_location: 1,
          time: 1,
          remark: 1,
        })
        .exec();
    }
    // send
    res.status(200).send({ dataList: data, imageList: image, groupList });
  } catch (error) {
    console.error(error);
    res.status(403).send({ dataList: {}, imageList: "", groupList: [] });
  }
});

// this need to have authorization!!!
router.get("/lostItem", verify, async (req, res) => {
  try {
    const userId = req.user;
    // find data of user
    const user = await User.findById(userId).exec();
    if (!user) {
      throw new Error("wrong mislayer id");
    }
    // query all lost item according to user id
    const lostItems = await LostItem.find({ mislayer: userId })
      .sort({ time: "asc" })
      .exec();
    // for each lost item, query similar ones in found items
    let foundItems = [];
    let tmp = [];
    for (let lostItem of lostItems) {
      tmp = await queryFoundItemWithLostItem(lostItem);
      foundItems = [...foundItems, ...tmp];
    }
    // query found item with user name, student_id
    tmp = await queryFoundItems({ name: user.name });
    for (let datum of tmp) {
      datum.score = Infinity;
    }
    foundItems = [...tmp, ...foundItems];
    tmp = await queryFoundItems({ student_id: user.student_id });
    for (let datum of tmp) {
      datum.score = Infinity;
    }
    foundItems = [...tmp, ...foundItems];
    // walk through foundItems, remove duplicates
    // read to understand this sytax: https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
    foundItems = foundItems.filter(
      (item, index, self) =>
        index === self.findIndex((it) => item._id.equals(it._id))
    );
    // sort data according to score and date
    foundItems.sort((a, b) => {
      if (b.score != a.score) {
        return b.score - a.score;
      }
      if (a.time != b.time) {
        if (a.time < b.time) return -1;
        else return 1;
      }
      return 0;
    });
    // console.log("foundItems and their final score:\n", foundItems);
    // send data
    res.status(200).send({ lostItems: lostItems, foundItems: foundItems });
  } catch (error) {
    console.error(error);
    res.status(400).send({ lostList: [], dataList: [] });
  }
});

// this need to have authorization!!!
router.delete("/lostItem", async (req, res) => {
  try {
    const deleteStatus = await LostItem.deleteOne({ _id: req.query.id });
    if (deleteStatus.deletedCount === 0) {
      throw new Error("id is incorrect");
    }
    res.status(200).send({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "fail", error: error.message });
  }
});
router.post("/register", async (req, res) => {
  try {
    await User.findOne({
      email: req.body.email,
    })
      .then(async (data) => {
        if (data !== null) {
          res.status(403).send({ result: "the email has been used" });
        } else {
          await User.create({
            name: req.body.name,
            student_id: req.body.id,
            email: req.body.email,
            password: req.body.password,
          });
          res.status(200).send({ result: "success" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ result: "server error" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "server error" });
  }
});
router.get("/logined", verify, async (req, res) => {
  try {
    res.status(200).send({ logined: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ logined: false });
  }
});

router.post("/google", async (req, res) => {
  try {
    let data = await User.findOne({
      name: req.body.name,
      email: req.body.email,
    }).exec();
    if (data === null) {
      data = await User.create({
        name: req.body.name,
        student_id: randomUUID(),
        email: req.body.email,
        password: randomUUID(),
      });
    }
    res.status(200).send({
      token: jwt.sign({ user: data._id }, JWT_SECRET),
      id: data._id,
      lang: data.language,
      result: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "server error" });
  }
});

router.post("/guest", async (req, res) => {
  try {
    const data = await User.create({
      name: "guest",
      student_id: randomUUID(),
      email: "hi",
      password: randomUUID(),
    });
    res.status(200).send({
      token: jwt.sign({ user: data._id }, JWT_SECRET),
      id: data._id,
      lang: data.language,
      result: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    let data = await User.find({
      email: req.body.email,
    }).exec();
    if (data.length === 0) {
      res.status(400).send({ result: "failed" });
    }
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (req.body.password === element.password) {
        res.status(200).send({
          token: jwt.sign({ user: element._id }, JWT_SECRET),
          id: element._id,
          language: element.language,
          result: "success",
        });
      } else {
        res.status(400).send({ result: "failed" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "server error" });
  }
});
router.get("/send", async (req, res) => {
  try {
    let data = await User.findOne({
      email: req.query.email,
    }).exec();
    if (data !== null) {
      await User.updateOne(
        { email: req.query.email },
        { password: req.query.password }
      )
        .then(() => res.status(200).send({ result: true }))
        .catch((err) => {
          console.log(err);
          res.status(400).send({ result: false });
        });
    } else {
      res.status(400).send({ result: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "server error" });
  }
});
router.post("/logout", verify, async (req, res) => {
  try {
    res.status(200).send({ result: "success" });
    req.user = null;
    req.token = null;
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "unauthorized" });
  }
});
router.get("/profile", verify, async (req, res) => {
  try {
    let data = await User.findOne({
      _id: req.user,
    }).exec();
    if (data !== null) {
      res.status(200).send({
        name: data.name,
        result: "success",
      });
    } else {
      res.status(400).send({ result: "failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "server error" });
  }
});
router.post("/change/language", verify, async (req, res) => {
  try {
    let data = await User.findOne({
      _id: req.user,
    }).exec();
    if (data !== null) {
      await User.updateOne({ _id: req.user }, { language: req.body.language })
        .then(() => res.status(200).send({ result: true }))
        .catch((err) => {
          console.log(err);
          res.status(400).send({ result: false });
        });
    } else {
      res.status(400).send({ result: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "server error" });
  }
});
router.post("/change/password", verify, async (req, res) => {
  try {
    let data = await User.findOne({
      _id: req.user,
    }).exec();
    if (data !== null) {
      await User.updateOne({ _id: req.user }, { password: req.body.password })
        .then(() => res.status(200).send({ result: true }))
        .catch((err) => {
          console.log(err);
          res.status(400).send({ result: false });
        });
    } else {
      res.status(400).send({ result: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "server error" });
  }
});
router.get("/check/password", verify, async (req, res) => {
  try {
    let data = await User.findOne({
      _id: req.user,
      password: req.query.password,
    }).exec();
    if (data !== null) {
      res.status(200).send({ result: true });
    } else {
      res.status(400).send({ result: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "server error" });
  }
});
export default router;
