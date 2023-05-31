import mongoose from "mongoose";

const mongo_connect = {
  connect: () => {
    if (!process.env.MONGO_URL) {
      console.error("Missing MONGO_URL!!!");
      process.exit(1);
    }
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log("mongo db connection created"));
    mongoose.connection.on(
      "error",
      console.error.bind(console, "connection error")
    );
  },
};

export { mongo_connect };
