import { Router } from "express";
import UserController from "../controllers/user";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";

import validateLogin from "../validations/user";

const router = Router();
const { verifyToken } = Authentication;
const { loginUser, getAllUsers } = UserController;

router.post("/login", validator(validateLogin), loginUser);

router.get("/", verifyToken, getAllUsers);

export default router;
