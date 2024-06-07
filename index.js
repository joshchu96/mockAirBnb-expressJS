const express = require('express'); //loading express module into node.
const app = express() //execute express in the app. 
const userRoutes = require('./src/routes/users');

app.use(express.json()); //middleware used to parse the reqest information prior to using it.

app.use("/airbnb",userRoutes); //app runs the userRoutes router file to clean up code clarity on this page. 


module.exports = app;

