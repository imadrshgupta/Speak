import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.any().required(),

    level: Joi.string()
        .valid("BEGINNER", "INTERMEDIATE", "ADVANCED")
        .required(),

    goal: Joi.string().required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.any().required(),
});

export const updateProfileSchema = Joi.object({
    name: Joi.string().min(3).max(50),

    goal: Joi.string(),

    level: Joi.string().valid(
        "BEGINNER",
        "INTERMEDIATE",
        "ADVANCED"
    )
}).min(1);

export const changePasswordSchema = Joi.object({
    currentPassword: Joi.any().required(),
    newPassword: Joi.any().required()
});

export const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required()
});

export const logoutSchema = Joi.object({
    refreshToken: Joi.string().required()
});

export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.any().required(),
});