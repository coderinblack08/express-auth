const express = require('express');
const volleyball = require('volleyball');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
require('dotenv').config();

const auth = require('./auth/auth.routes');
const middlewears = require('./auth/auth.middlewares');

const app = express();
const port = process.env.PORT || 3030;

app.use(middlewears.checkTokenSetUser);
app.use(volleyball);
app.use(express.json());
app.use(cors());

// TODO: Add limiter to routes as middleware

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 25 // limit each IP to 25 requests per windowMs
});

app.use('/auth', auth);

app.get('/', (req, res) => {
    res.json({
        message: '🦄 Gekko is an online polling application! Welcome to our REST api!',
        user: req.user
    });
});

function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    next(error);
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack,
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));