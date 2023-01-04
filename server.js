const express = require("express");

//defaults to index.js
const mainRouter = require("./controllers");

const app = express ();


const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
console.log("Listening on http://localhost:" + PORT)
});