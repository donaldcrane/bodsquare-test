import { Router } from "express";
import TaskController from "../controllers/task";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import { validateId, validateTask, updateTaskValidation } from "../validations/task";

const router = Router();
const {
  createTask, getAllTask, getTaskById, updateTask, deleteTask
} = TaskController;
const { verifyToken } = Authentication;

router.post("/", verifyToken, validator(validateTask), createTask);

router.get("/", verifyToken, getAllTask);
router.get("/:taskId", verifyToken, validator(validateId), getTaskById);

router.patch("/:taskId", verifyToken, validator(updateTaskValidation), updateTask);
router.delete("/:taskId", verifyToken, validator(validateId), deleteTask);

export default router;
