import mongoose from "mongoose";
import { IChannel } from "../utils/interface";

const ChannelSchema = new mongoose.Schema({
  name: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model<IChannel>("Channel", ChannelSchema);
