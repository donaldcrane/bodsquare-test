import { Schema, model } from "mongoose";
import { ITask } from "../utils/interface";

const taskSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  description: { type: String },
  channelId: { type: Schema.Types.ObjectId, ref: "Channel" },
}, { timestamps: true });

export default model<ITask>("Task", taskSchema);
