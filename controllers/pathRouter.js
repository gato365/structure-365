const { Router } = require("express");
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const auth = require('../middleware/auth');

const pathRouter = new Router();

pathRouter.get('/', auth, async (req, res) => {

    const plainUser = req.user.get({plain: true});

    res.render('home', {
        user: plainUser,
        // ~~~~~~~~~~~~~~~~~~ TEST ~~~~~~~~~~~~~~~~~~~//
        chartData: [
            { x: 50, y: 7 },
            { x: 60, y: 8 },
            { x: 70, y: 8 }, 
            { x: 80, y: 9 },
            { x: 90, y: 9 },
            { x: 100, y: 9 },
            { x: 110, y: 10 },
            { x: 120, y: 11 },
            { x: 130, y: 14 },
            { x: 140, y: 14 },
            { x: 150, y: 15 }

        ]
        // ~~~~~~~~~~~~~~~~~~ TEST ~~~~~~~~~~~~~~~~~~~//
    });
})

pathRouter.get('/landing', (req, res) => {
    res.render('landing', {
        style: 'landing.css',
    });
})

pathRouter.get('/login', (req, res) => {
    res.render('login');
})

pathRouter.get('/signup', (req, res) => {
    res.render('signup');
})

pathRouter.get('/nav', (req, res) => {
    res.render('nav');
})

module.exports = pathRouter;