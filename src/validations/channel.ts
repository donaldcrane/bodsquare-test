import Joi from "joi";
import objectId from "./common";

const validateId = {
  params: Joi.object({
    channelId: objectId.messages({
      "any.required": "Task is required.",
      "string.length": "Task id must be a valid mongoose id.",
    })
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

export default validateId;
