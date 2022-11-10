import mongoose from "mongoose";
import config from "../config/index";
import models from "../models";
import userSeed from "./users";
import channelSeed from "./channel";

mongoose.connect(config.MONGO_URL, async () => {
  await models.User.deleteMany({});
  await models.User.insertMany(userSeed);
  //
  await models.Channel.deleteMany({});
  await models.Channel.insertMany(channelSeed);
  console.log("seeding done...");
  await mongoose.connection.close();
});
