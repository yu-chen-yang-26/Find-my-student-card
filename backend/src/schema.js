import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  student_id: { type: String, required: true, lowercase: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  language: { type: String, required: true, lowercase: true, default: "zh-tw" },
  password: { type: String, required: true },
});

const LocationSchema = new Schema({
  location: { type: String, required: true },
  position: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const FoundItemSchema = new Schema(
  {
    category: { type: String, required: true },
    finder: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
      default: "647801dfd2fca987a0c04fb4",
    },
    found_location: { type: LocationSchema, required: true },
    retrieve_location: { type: LocationSchema, required: true },
    time: { type: Date, required: true },
    remark: { type: String },
    mislayer_clue: {
      student_id: { type: String },
      name: { type: String },
    },
    group: { type: String },
    correspond: { type: mongoose.Types.ObjectId, ref: "lost_item" },
    image: { type: mongoose.Types.ObjectId, ref: "image" },
  },
  { timestamps: { createdAt: "created_at" } }
);

const LostItemSchema = new Schema(
  {
    mislayer: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    category: { type: String, required: true },
    locations: [{ type: LocationSchema }],
    time: { type: Date, required: true },
    remark: { type: String },
    correspond: { type: mongoose.Types.ObjectId, ref: "lost_item" },
  },
  { timestamps: { createdAt: "created_at" } }
);

const ImageSchema = new Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
});

const User = mongoose.model("user", UserSchema);
const FoundItem = mongoose.model("found_item", FoundItemSchema);
const LostItem = mongoose.model("lost_item", LostItemSchema);
const Image = mongoose.model("image", ImageSchema);

export { User, FoundItem, LostItem, Image };
