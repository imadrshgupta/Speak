import Joi from "joi";

export const createSpeakingSessionSchema =
    Joi.object({
        topic: Joi.string().required(),

        transcript: Joi.string().required(),

        duration: Joi.number().integer().min(1).required(),
    });