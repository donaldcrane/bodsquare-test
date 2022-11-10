import { Request, Response } from "express";
import rabbitMQ from "../rabbitMq/send";
import { mqQueues } from "../utils/interface";
import models from "../models";
import { successResponse, errorResponse, handleError } from "../utils/responses";

/**
 * @class TaskController
 * @description create, get, delete, update Task
 * @exports TaskController
 */
export default class TaskController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async createTask(req: Request, res: Response) {
    try {
      const { _id } = req.user;
      const { name, description, channelId } = req.body;
      const channel = await models.Channel.findOne({
        _id: channelId, members: _id
      });
      if (!channel) {
        return errorResponse(res, 404, "Please join channel before you can create task.");
      }
      const taskData = {
        name, description, owner: _id, channelId
      };
      const queue = mqQueues.FORUM;
      rabbitMQ(queue, JSON.stringify(taskData));

      return successResponse(res, 200, "Task created.");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async getAllTask(req: Request, res: Response) {
    try {
      const task = await models.Task.find({ });
      return successResponse(res, 200, "Tasks fetched successfully.", task);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async getTaskById(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const task = await models.Task.findById(taskId);
      if (!task) {
        return errorResponse(res, 404, "Task not found.");
      }
      return successResponse(res, 200, "Task fetched successfully.", task);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async updateTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const task = await models.Task.findByIdAndUpdate(taskId, req.body, { new: true });
      if (!task) return errorResponse(res, 404, "Task not found.");
      return successResponse(res, 200, "Task updated successfully.", task);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async deleteTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const task = await models.Task.findById({ _id: taskId, owner: req.user._id });
      if (!task) {
        return errorResponse(res, 404, "Task not found.");
      }
      await models.Task.findByIdAndDelete(taskId);

      return successResponse(res, 200, "Task deleted successfully.");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
