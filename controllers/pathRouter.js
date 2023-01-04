const { Router } = require ("express");

const pathRouter = new Router();


pathRouter.get('/',(req,res)=>{
    // res.send("foo");
    res.render('home');
});

module.exports = pathRouter;