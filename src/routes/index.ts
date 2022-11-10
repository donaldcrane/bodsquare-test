import { Router } from "express";
import userRoutes from "./userRoutes";
import taskRoutes from "./taskRoutes";
import channelRoutes from "./channelRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/channels", channelRoutes);

export default router;
