import Joi from "joi";
import { ILogin } from "../utils/interface";

const validateLogin = (login: ILogin) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(login);
};

export default validateLogin;
