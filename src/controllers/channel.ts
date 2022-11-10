import { Request, Response } from "express";
import models from "../models";
import { successResponse, errorResponse, handleError } from "../utils/responses";

/**
 * @class ChannelController
 * @description create, get, delete, update Channel
 * @exports ChannelController
 */
export default class ChannelController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async getAllChannels(req: Request, res: Response) {
    try {
      const Channels = await models.Channel.find({}).populate({
        path: "members", select: "-password"
      });
      return successResponse(res, 200, "Channels fetched successfully.", Channels);
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
  static async getChannelById(req: Request, res: Response) {
    try {
      const { channelId } = req.params;
      const channel = await models.Channel.findById(channelId).populate({
        path: "members", select: "-password"
      });
      if (!channel) {
        return errorResponse(res, 404, "Channel not found.");
      }
      return successResponse(res, 200, "Channel fetched successfully.", channel);
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
  static async joinChannel(req: Request, res: Response) {
    const { channelId } = req.params;
    const { _id } = req.user;
    const channel = await models.Channel.findById(channelId);
    if (!channel) return errorResponse(res, 404, "invalid channel");
    const inForum = await models.Channel.findOne({ _id: channelId, members: _id });
    if (inForum) return errorResponse(res, 409, "User already in channel");
    await models.Channel.updateOne(
      { _id: channelId },
      { $addToSet: { members: [_id] } }
    );
    return successResponse(
      res,
      200,
      "Successfully joined forum."
    );
  }
}
