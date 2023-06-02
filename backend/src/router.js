import express from "express";
import { User, FoundItem, LostItem, Mail, Image } from "./schema.js";
import { queryFoundItems } from "./mongoose/query.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
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
      .select({ category: 1, found_location: 1, time: 1, remark: 1 })
      .exec();
    res.status(200).send({ dataList: data });
  } catch (error) {
    console.error(error.message);
    res.status(403).send({ dataList: [] });
  }
});

router.get("/search", async (req, res) => {
  // parse the query string
  const { category, location, startTime, endTime, name, student_id } =
    req.query;

  try {
    const data = await queryFoundItems(
      category,
      location,
      startTime,
      endTime,
      name,
      student_id
    );
    res.status(200).send({ dataList: data });
  } catch (err) {
    res.status(403).send({ dataList: [] });
  }
});

// 完全不懂 upload 怎麼運作的，放著不動
router.post("/upload", upload.single("file"), async (req, res) => {
  const id = await new Image({
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
  }).save();
  res.json({ id: id._id });
});

router.post("/submit/foundItem", express.json(), async (req, res) => {
  let itemParam = req.body; // 吃一個 json / js object
  if (!itemParam.group) {
    itemParam.group = randomUUID();
  }
  try {
    const data = await FoundItem.create(itemParam);
    res.json({
      message: "success",
      SendPermition: true,
      id: data._id,
      group: itemParam.group,
    });
  } catch (error) {
    res
      .status(405)
      .send({ message: "fail", SendPermition: false, detail: error.message });
  }
});

router.post("/submit/lostItem", express.json(), async (req, res) => {
  let itemParam = req.body;
  try {
    const data = await LostItem.create(itemParam);
    res.json({
      message: "success",
      SendPermition: true,
      id: data._id,
      group: itemParam.group,
    });
  } catch (error) {
    res
      .status(405)
      .send({ message: "fail", SendPermition: false, detail: error.message });
  }
});

// router.post("/sendMail", express.json(), async (req, res) => {
//   await new Mail({ ...req.body.params }).save();
//   res.json({ message: "success" });
// });

router.get("/detail", async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      throw new Error("need query id");
    }
    const data = await FoundItem.findById(id);
    // 搞圖片，這我就不懂了
    let imageList = [];
    if (data.image) {
      for (let index = 0; index < data.image.length; index++) {
        let element = data.image[index];
        let temp = await Image.findOne({ _id: element });
        imageList = [
          ...imageList,
          "data:image/" +
            temp.img.contentType +
            ";base64," +
            temp.img.data.toString("base64"),
        ];
      }
    }
    res.status(200).send({ dataList: data, imageList: imageList });
  } catch (error) {
    res.status(403).send({ dataList: [], imageList: [] });
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
          await new User({
            name: req.body.name,
            student_id: req.body.id,
            email: req.body.email,
            password: req.body.password,
          }).save();
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
router.post("/logined", verify, async (req, res) => {
  try {
    res.status(200).send({ logined: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ logined: false });
  }
});

router.post("/google", async (req, res) => {
  return res.status(200).send({
    token: jwt.sign({ user: req.body.name }, JWT_SECRET),
  });
});

router.post("/guest", async (req, res) => {
  return res.status(200).send({
    token: jwt.sign({ user: "guest" }, JWT_SECRET),
  });
});

router.post("/login", async (req, res) => {
  try {
    let data = await User.find({
      email: req.body.email,
      password: req.body.password,
    }).exec();
    if (data.length !== 0) {
      res.status(200).send({
        token: jwt.sign({ user: "guest" }, JWT_SECRET),
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
router.get("/send", async (req, res) => {
  try {
    let data = await User.find({
      email: req.query.email,
    }).exec();
    if (data.length !== 0) {
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
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "unauthorized" });
  }
});
// router.post("/checkPassword", jsonParser, async (req, res) => {
//   await Mail.findOne({
//     ID: req.body.params.ID,
//     info: req.body.params.location + " " + req.body.params.time,
//   }).exec(async function (err, data) {
//     if (err) {
//       res.status(403).send({ messages: "error" });
//     } else {
//       if (data.checkPassword === parseInt(req.body.params.password)) {
//         await FoundItem.updateOne(
//           {
//             ID: req.body.params.ID,
//             time: req.body.params.time,
//             location: req.body.params.location,
//           },
//           { founded: "True" }
//         )
//           .then(() => res.status(200).send({ messages: "correct" }))
//           .catch((err) => {
//             console.log(err);
//             res.status(403).send({ messages: "error" });
//           });
//       } else {
//         res.status(200).send({ messages: "wrong" });
//       }
//     }
//   });
// });

// router.post("/checkPassword", jsonParser, async (req, res) => {
//   await Mail.findOne({
//     ID: req.body.params.ID,
//     info: req.body.params.location + " " + req.body.params.time,
//   }).exec(async function (err, data) {
//     if (err) {
//       res.status(403).send({ messages: "error" });
//     } else {
//       if (data.checkPassword === parseInt(req.body.params.password)) {
//         await Card.updateOne(
//           {
//             ID: req.body.params.ID,
//             time: req.body.params.time,
//             location: req.body.params.location,
//           },
//           { founded: "True" }
//         )
//           .then(() => res.status(200).send({ messages: "correct" }))
//           .catch((err) => {
//             console.log(err);
//             res.status(403).send({ messages: "error" });
//           });
//       } else {
//         res.status(200).send({ messages: "wrong" });
//       }
//     }
//   });
// });
export default router;
