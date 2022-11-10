import jwt from "jsonwebtoken";
import config from "../config/index";

const verifyToken = async (authorization: string) => {
  try {
    const token = authorization;
    const jwtRes = await jwt.verify(token, config.JWT_KEY as string);
    const user = jwtRes;
    return user;
  } catch (e) {
    return null;
  }
};

export default verifyToken;
