const { Router } = require("express");

const usersRouter = require('./users');
const exerciseRouter = require('./exercise');

const apiRouter = new Router();

apiRouter.use('/user', usersRouter);
apiRouter.use('/exercise', exerciseRouter);

module.exports = apiRouter;