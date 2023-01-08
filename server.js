require("dotenv").config();
const express = require("express");
const expressHandlebars = require("express-handlebars");
const cookieParser = require('cookie-parser');

// Access connection to sequelize
const sequelize = require('./config/connection')
// Access to the routers (defaults to index.js)
const mainRouter = require("./controllers");
const pathRouter = require("./controllers/pathRouter");
const helpers = require('./helpers/helpers');

const handlebars = expressHandlebars.create({helpers});

// Creating the App
const app = express();


// Either on Heroku's port or my local port 
const PORT = process.env.PORT ||3001;

// Middleware 
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// Use the main router
app.engine("handlebars", handlebars.engine);
app.set('view engine', 'handlebars');
app.use(mainRouter);

// Don't KNOW
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("Listening on http://localhost:" + PORT)
    });
});