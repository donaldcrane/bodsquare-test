import { Request, Response } from "express";
import bcrypt from "bcrypt";
import models from "../models";
import { successResponse, errorResponse, handleError } from "../utils/responses";
import jwtHelper from "../utils/jwt";
import { IUser } from "../utils/interface";

const { generateToken } = jwtHelper;
/**
 * @class UserController
 * @description create, log in user
 * @exports UserController
 */
export default class UserController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user: IUser | null = await models.User.findOne({ email });
      if (!user) { return errorResponse(res, 404, "Email does not exist."); }
      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) { return errorResponse(res, 404, "Password is not correct!."); }
      const { _id } = user;
      const token = await generateToken({ _id, email });
      const userDetails = {
        _id, email, firstname: user.firstName, lastName: user.lastName
      };
      return successResponse(
        res,
        200,
        "User Logged in Successfully.",
        { token, userDetails }
      );
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
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await models.User.find({}).select("-password");
      return successResponse(
        res,
        200,
        "Successfully fetched users.",
        { total: users.length, users }
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
