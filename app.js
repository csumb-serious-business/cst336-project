const express = require('express');
const nunjucks = require('nunjucks');
const app = require("./app/routes");
const admin = require("./admin/routes");

const bcrypt = require('bcrypt');
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

//routes
server.use(express.urlencoded({ extended: true }));


server.post("/", async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    //checks if username is in the database
    let result = await checkUsername(username);
    console.dir(result);

    // let hashedPwd = "$2a$05$r2tnsPeQXP/yWuh7.Mz3MO3zkUAposLywMXrsQ1EFZpf2ecvzw6mm";
    //initialize pashedPwd to blank
    let hashedPwd = "";

    //check if result is in the database
    if (result.length > 0) {
        hashedPwd = result[0].password;
    }

    let passwordMatch = await checkPassword(password, hashedPwd);
    console.log("passwordMatch: " + passwordMatch);

    if (username == 'admin' && passwordMatch) {
        req.session.authenticated = true;
        // res.render("welcome");
        res.render("admin/root.njk"); //replaced welcome for admin/root.njk
    } else {
        res.render("index", { "loginError": true });
    }
});

server.get("/myAccount", isAuthenticated, function(req, res) {
    if (req.session.authenticated) {
        // res.render("account");
        res.render("admin/root.njk"); //replaced account for admin/root.njk
    } else {
        res.redirect("/");
    }
});

server.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/");
});

/**
 * Checks the bcrypt value of the password submitted
 * @param {string} password
 * @return {boolean} true if password submitted is equal to
 * bcrypt-hashed value, false otherwise. 
 */
function checkPassword(password, hashedValue) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, hashedValue, function(err, result) {
            console.log("Result: " + result);
            resolve(result);
        });
    });
}
/**
 * This function checks if the username is in the database
 * @param {string} username 
 */
function checkUsername(username) {
    let sql = "SELECT * FROM users WHERE username=?";
    return new Promise(function(resolve, reject) {
        let conn = createDBConnection();
        conn.connect(function(err) {
            if (err) throw err;
            conn.query(sql, [username], function(err, rows, fields) {
                if (err) throw err;
                console.log("Rows found: " + rows.length);
                resolve(rows);;
            }); //query
        }); //connect
    }); //promise
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isAuthenticated(req, res, next) {
    if (!req.session.authenticated) {
        res.redirect('/');
    } else {
        next()
    }
}

var port = 33333;
server.listen(port);
console.log(`server listening on port ${port}`);