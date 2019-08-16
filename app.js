const express = require('express');
const nunjucks = require('nunjucks');
const app = require("./app/routes");
const admin = require("./admin/routes");
const json = require('json5');

// const fs = ;

config = json.parse(require('fs').readFileSync('config/app.json5'));

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
server.get('/*', function (req, res) {
    return res.render('404');
});

let port = process.argv.includes('heroku') ? process.env.PORT : config.port;

server.listen(port);

console.log(`server listening on port ${config.port}`);