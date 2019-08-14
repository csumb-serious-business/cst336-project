const express = require('express');
const nunjucks = require('nunjucks');
const app = require("./app/routes");
const admin = require("./admin/routes");

// const bcrypt = require('bcrypt');
const session = require('express-session');

var server = express();

server.set('view engine', 'njk');


nunjucks.configure(['common/views', 'admin/views', 'app/views'], {
    autoescape: true,
    express: server,

    secret: "top secret!",
    resave: true,
    saveUninitialized: true
});

// serve common static files
server.use('/', express.static('common/public'));

// wire up routes
server.use(admin);
server.use(app);



var port = 33333;
server.listen(port);
console.log(`server listening on port ${port}`);