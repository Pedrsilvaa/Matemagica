
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const loginRouter = require('./routers/loginRouter');
const userRouter = require('./routers/userRouter');
const gameRouter = require('./routers/gameRouter');
const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
    maxAge: 600
}));

app.use(loginRouter, userRouter, gameRouter);

module.exports = app;
