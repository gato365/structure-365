const { Router } = require ("express");

const pathRouter = require("./pathRouter");

const allRouter = new Router();


allRouter.use("/", pathRouter);

module.exports = allRouter;

// CRUD