const jwt = require('jsonwebtoken');

const schema = require('./auth.schema');
const users = require('./auth.model');

// Login Middlewares

const isValidUser = async (user) => {
    const { error } = await schema.registerSchema.validateAsync(user);
    return (!error) ? true : false;
};

const isValidLogin = async (user) => {
    const { error } = await schema.loginSchema.validateAsync(user);
    return (!error) ? true : false;
}

const uniqueUser = async (username) => {
    const exists = await users.findOne({ username: username });
    return (!exists) ? true : false;
};

// Authentication Middlewares

const checkTokenSetUser = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (authHeader) {
        // To get token from format 'Bearer <token>'
        const token = authHeader.split` `[1];
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
                if (!error) {
                    req.user = user;
                    next();
                } else {
                    next(new Error(error));
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }
}

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401);
        next(new Error('🚫 Un-Authorized 🚫'));
    }
}

module.exports = {
    isValidUser,
    isValidLogin,
    uniqueUser,
    checkTokenSetUser,
    isLoggedIn
};