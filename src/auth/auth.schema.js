const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    username: Joi.string()
        .regex(/(^[a-zA-Z0-9_]*$)/)
        .min(2)
        .max(30)
        .required(),
    password: Joi.string()
        .trim()
        .min(8)
        .required(),
    bio: Joi.string()
        .trim()
        .min(1)
        .max(500)
        .required(),
    role: Joi.string()
        .valid('user', 'admin')
        .required()
});

const loginSchema = Joi.object({
    username: Joi.string()
        .regex(/(^[a-zA-Z0-9_]*$)/)
        .min(2)
        .max(30)
        .required(),
    password: Joi.string()
        .trim()
        .min(8)
        .required()
});

module.exports = {
    registerSchema,
    loginSchema
};