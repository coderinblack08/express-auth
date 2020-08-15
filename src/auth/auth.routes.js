const express = require('express');
const router = express.Router();

const middlewares = require('./auth.middlewares');
const controllers = require('./auth.controllers');

router.get('/', (req, res) => {
    res.json({
        message: '🌈 Welcome to the auth api!'
    });
});

router.post('/register', async (req, res, next) => {
   await controllers.register(req, res, next);
});

router.post('/login', async (req, res, next) => {
    await controllers.login(req, res, next);
});

module.exports = router;