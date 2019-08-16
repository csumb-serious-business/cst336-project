const express = require('express');
const nunjucks = require('nunjucks');
const app = require("./app/routes");
const admin = require("./admin/routes");

const session = require('express-session');

const server = express();

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

// catch all route
server.get('/*', function(req, res) {
    return res.render('404');
});


//for local db
var port = 33333;
server.listen(port);
console.log(`server listening on port ${port}`);

//for heroku
// server.listen(process.env.PORT || 5000);