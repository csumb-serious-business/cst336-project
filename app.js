const express = require('express');
const nunjucks = require('nunjucks');
const routes = require("./core/routes");



var app = express();

app.set('view engine', 'njk');

nunjucks.configure(['views'], {
    autoescape: true,
    express: app
});



app.use(routes);

var port = 33333;
app.listen(port);
console.log(`server listening on port ${port}`);