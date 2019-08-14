const express = require("express");
const router = express.Router();

const readSQL = require('../common/common').readSql;
const dbGet = require('../common/common').dbGet;

const SQL = {
    titles: readSQL('app/sql/get-titles.sql'),
    types: readSQL('app/sql/get-types.sql'),
    materials: readSQL('app/sql/get-materials.sql'),
    artists: readSQL('app/sql/get-artists.sql'),
    search: readSQL('app/sql/search-masterpieces.ps.sql')
};

//serve static files
router.use('/app', express.static('app/public'));


// app routes
router.get('/',
    async(req, res) => res.render('app/root.njk', {
        titles: await dbGet(SQL.titles),
        types: await dbGet(SQL.types),
        materials: await dbGet(SQL.materials),
        artists: await dbGet(SQL.artists)
    }));

// catch all
router.get('/*', function(req, res) {
    return res.render('404');
});

//routes
server.use(express.urlencoded({ extended: true }));


server.post("login", async function(req, res) {
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
        res.render("admin");
    } else {
        res.render("login", { "loginError": true });
    }
});

server.get("/myAccount", isAuthenticated, function(req, res) {
    if (req.session.authenticated) {
        res.render("admin");
    } else {
        res.redirect("login");
    }
});

server.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("login");
});

module.exports = router;