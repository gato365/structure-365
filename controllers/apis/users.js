const { Router } = require("express");
const jwt = require("jsonwebtoken");

const { User } = require('../../models'); 
//Issue with Ben's Code: const { User } = require('../../models/User');

const usersRouter = new Router();


// 1) POST to place a new user (by login)
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



// 2) GET Route for retrieving all the users
usersRouter.get('/', async (req, res) => {

    try {
      const userData = await User.findAll();
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  
  });


// 3) POST to place a new user (in INSOMNIA)
usersRouter.post('/', async (req, res) => {

    
    const { username, email, password,  } = req.body;

    console.error(username);


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

    const userData = await User.create({
        username,
        email,
        password,
    });

    //need to check functionality of this
    res.status(200).json({
        id: userData.id,
    });
});


// 4) Get 1 user
usersRouter.get('/:id', async (req, res) => {

    console.info(`${req.method} request received for it work`);
  
    try {
      const usersData = await User.findByPk(req.params.id, {
        // Need to do a task, I am pretty SUre
      });
  
  
      if (!usersData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
  
      res.status(200).json(usersData);
  
    } catch (err) {
  
      console.log(req.params.id);
  
      res.status(500).json(err);
    }
  
  });
  

module.exports = usersRouter;
