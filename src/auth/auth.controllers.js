const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('./auth.model');
const schema = require('./auth.schema');
const middlewares = require('./auth.middlewares');

const createTokenSendResponse = (user, res, next) => {
    const payload = {
        _id: user._id,
        username: user.username,
        bio: user.bio,
        role: user.role
    };
    jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' }, (err, token) => {
        if (err) {
            res.status(422);
            next(new Error('💸 Failed to create token!'));
        } else {
            res.json({ token });
        }
    });
};

const register = async (req, res, next) => {
    if (await middlewares.isValidUser(req.body)) {
        if (middlewares.uniqueUser(req.body.username)) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            const newUser = await users.insert({
                username: req.body.username,
                password: hashedPassword,
                bio: req.body.bio,
                role: 'user'
            });
            res.json(newUser);
        } else {
            const takenError = new Error('🙊 Username is already taken. Please choose another one!')
            next(takenError);
        }
    } else {
        const error = new Error('User does not follow schema');
        next(error);
    }
};

const login = async (req, res, next) => {
    if (middlewares.isValidLogin(req.body)) {
        const user = await users.findOne({ username: req.body.username });
        if (user) {
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
            if (correctPassword) {
                createTokenSendResponse(user, res, next);
            } else {
                res.status(422);
                next(new Error('🙊 Unable to login with credentials!'));
            }
        } else {
            res.status(422);
            next(new Error('🙊 Unable to login with credentials!'));
        }
    } else {
        res.status(422);
        next(new Error('🙊 Unable to login with credentials!'));
    }
};

module.exports = {
    register,
    login
};