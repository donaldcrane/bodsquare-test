import Joi from "joi";
import objectId from "./common";

export const validateTask = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    channelId: objectId.messages({
      "any.required": "Task is required.",
      "string.length": "Task id must be a valid mongoose id.",
    })
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

export const validateId = {
  params: Joi.object({
    taskId: objectId.messages({
      "any.required": "Task is required.",
      "string.length": "Task id must be a valid mongoose id.",
    })
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

export const updateTaskValidation = {
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string()
  }),
  params: Joi.object({
    taskId: objectId.messages({
      "any.required": "Task is required.",
      "string.length": "Task id must be a valid mongoose id.",
    })
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};
