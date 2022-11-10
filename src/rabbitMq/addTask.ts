import { Message } from "amqplib";
import socket from "./socket";
import models from "../models";

const addTask = async (data: Message | null) => {
  try {
    if (!data) return;

    const messageData = JSON.parse(data.content.toString());
    const { channelId } = messageData;
    const newTask = await models.Task.create(messageData);
    if (!newTask) {
      console.error("error creating Task");
      return;
    }
    // const chatMessage = await ChatMessage.findById(newChatMessage.id);
    socket.to(`channel-${channelId}`).emit("A new Task has been created.", newTask);
  } catch (e) {
    console.log(e);
    console.error(e);
  }
};

export default addTask;
