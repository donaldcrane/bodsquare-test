import amqp from "amqplib/callback_api";
import config from "../config/index";
import { mqQueues } from "../utils/interface";
import addChat from "./addTask";
import db from "../config/database";

const rabbitUrl = config.RABBITMQ_URL as string;
amqp.connect(rabbitUrl, (connectionError, connection) => {
  if (connectionError) throw connectionError;
  db.connect();
  connection.createChannel((channelError, channel) => {
    if (channelError) throw channelError;

    channel.assertQueue(mqQueues.FORUM, { durable: false });
    console.info(" [*] Waiting for forum messages in %s. To exit press CTRL+C", mqQueues.FORUM);

    channel.consume(mqQueues.FORUM, addChat, { noAck: true });
  });
});
