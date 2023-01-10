const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Exercise = require('../models/Exercise');

module.exports = async (req, res, next) => {
    
    const { logintoken } = req.cookies;

    try {
        const data = jwt.verify(logintoken, process.env.JWT_KEY);
        const { id } = data;

        const user = await User.findByPk(id);
        if (!user) {
            res.redirect('/login');
            return;
        }

        req.user = user;
        next();
    }  catch(error) {
        if(error.message === "invalid token") {
            res.redirect('/landing');
        } else if (error.message === "jwt must be provided") {
           res.redirect('/landing');
        } else {
            res.status(500).end("bad things happened here");
        }
    }
}