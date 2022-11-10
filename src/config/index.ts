import { isEmpty } from "lodash";
import logger from "pino";
import dotenv from "dotenv";

dotenv.config();

const config = {
  logger: logger(),
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL as string,
  JWT_KEY: process.env.JWT_KEY,
  APP_NAME: process.env.APP_NAME,
  SOCKET_PORT: process.env.SOCKET_PORT,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
};

const absentConfig = Object.entries(config)
  .map(([key, value]) => [key, !!value])
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (!isEmpty(absentConfig)) {
  throw new Error(`Missing Config: ${absentConfig.join(", ")}`);
}

export default config;
