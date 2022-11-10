import amqp from "amqplib/callback_api";
import config from "../config/index";

const rabbitUrl = config.RABBITMQ_URL as string;

const sendRabbitMQ = (queueName: string, data: any) => {
  if (typeof data !== "string") data = JSON.stringify(data);

  amqp.connect(rabbitUrl, (connectionError, connection) => {
    if (connectionError) throw connectionError;

    connection.createChannel((channelError, channel) => {
      if (channelError) throw channelError;

      let queue = queueName;
      channel.assertQueue(queue, { durable: false });
      channel.sendToQueue(queue, Buffer.from(data));
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  });
};

export default sendRabbitMQ;
