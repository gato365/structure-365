const express = require("express");
const {engine} = require("express-handlebars");

//defaults to index.js
const mainRouter = require("./controllers");

// Creating the App
const app = express();

// Either on Heroku's port or my local port 
const PORT = process.env.PORT || 3001;


// Use the main router
app.engine("handlebars",engine());
app.set('view engine', 'handlebars');
app.use(mainRouter);


app.listen(PORT, () => {
console.log("Listening on http://localhost:" + PORT)
});