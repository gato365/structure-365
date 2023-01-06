const { Router } = require("express");
const jwt = require("jsonwebtoken");

const { User } = require('../../models/User');

const usersRouter = new Router();

usersRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    //set user to the email being passed in
    const user = await User.findOne({ where: {email}});

    //if user doesnt exist return error
    if (!user) {
        res.status(401).end('User not Found');
        return;
    };

    //need to check functionality of this password check too
    if (user.password !== password) {
        res.status(401).end("Bad password");
        return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);

    res.cookie('logintoken',token, { httpOnly: true });

    res.end();
});

usersRouter.post('/', async (req, res) => {
    const { username, email, password,  } = req.body;

    //set user to the username being passed in
    let user = await User.findOne({ where: {username}});

    //check to see if username has been used already
    if (user) {
        res.status(409).end('Username taken');
        return;
    };

    //set user to the email being passed in
    user = await User.findOne({ where: {email}});

    //check to see if email has been used already
    if (user) {
        res.status(409).end('Email taken');
        return;
    };

    const newUserObject = await User.create({
        username,
        email,
        password,
    });

    //need to check functionality of this
    res.status(200).json({
        id: newUserObject.id,
    });
});

module.exports = usersRouter;
