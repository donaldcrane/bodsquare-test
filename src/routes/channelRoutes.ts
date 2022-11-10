import { Router } from "express";
import ChannelController from "../controllers/channel";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import validateId from "../validations/channel";

const router = Router();
const {
  getAllChannels, getChannelById, joinChannel
} = ChannelController;
const { verifyToken } = Authentication;

router.get("/", verifyToken, getAllChannels);
router.get("/:channelId", verifyToken, validator(validateId), getChannelById);

router.patch("/:channelId", verifyToken, validator(validateId), joinChannel);

export default router;
