const { Router } = require ("express");

const pathRouter = new Router();


pathRouter.get('/',(req,res)=>{
    res.send("foo");
});

module.exports = pathRouter;