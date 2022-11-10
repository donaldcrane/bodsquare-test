import express from "express";
import http from "http";
import { Server } from "socket.io";
import validateToken from "../middlewares/verifyToken";
import config from "../config/index";
import models from "../models";
import { IChannel } from "../utils/interface";

const app = express();
const server = new http.Server(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.use(async (socket, next) => {
  const { token } = socket.handshake.auth;
  const verifyRes = await validateToken(token);
  if (!verifyRes) return next(new Error("you are not authorized"));
  // const { user } = verifyRes as any;

  socket.data.user = verifyRes;
  next();
});

io.on("connection", async (socket) => {
  console.info(`${socket.id} connected.`);

  const { user } = socket.data;
  socket.join(`user-${user.id}-notification`);

  const channels = await models.Channel.find({ members: user._id });
  const channelsIds = channels.map((channel: IChannel) => `channel-${channel._id}`);
  socket.join(channelsIds);

  socket.on("disconnect", () => console.info(`${socket.id} disconnected.`));
});

server.listen(config.SOCKET_PORT || "8080", () => {
  console.log(`socket server is running on port: ${config.SOCKET_PORT}`);
});

export default io;
