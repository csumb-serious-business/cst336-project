const express = require("express");
const router = express.Router();

const app = require("../app.js");
var server = express();
server.set('view engine', 'njk');

//serve static files
router.use('/admin', express.static('admin/public'));

const tools = require("./functions");


/* app routes
 * DON'T USE THESE PATHS:
 *    /    -- root path
 *    /*   -- catch all path
 * */
router.get('/admin',
    async(req, res) => res.render('admin/root.njk', {
        /* todo add app forms */
        example: await { /* some slow callback */ }
    }));

// example of passing a function instead of anonymous
router.get('/example', example);

function example(req, res) {
    // do something here if required, ie check for redirects
    return res.render('admin/root.njk', {});
}
//routes
server.use(express.urlencoded({ extended: true }));


server.post("login", async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    //checks if username is in the database
    // let result = await checkUsername(username);
    // console.dir(result);

    //     // // let hashedPwd = "$2a$05$r2tnsPeQXP/yWuh7.Mz3MO3zkUAposLywMXrsQ1EFZpf2ecvzw6mm";
    //     // //initialize pashedPwd to blank
    //     // let hashedPwd = "";

    //     // //check if result is in the database
    //     // if (result.length > 0) {
    //     //     hashedPwd = result[0].password;
    //     // }

    //     // let passwordMatch = await checkPassword(password, hashedPwd);
    //     // console.log("passwordMatch: " + passwordMatch);

    //     // if (username == 'admin' && passwordMatch) {
    if (username == 'admin' && username == 'secret') {
        req.session.authenticated = true;
        res.render("admin");
    } else {
        res.render("login", { "loginError": true });
    }
});

// server.get("/myAccount", tools.isAuthenticated, function(req, res) {
//     if (req.session.authenticated) {
//         res.render("admin");
//     } else {
//         res.redirect("login");
//     }
// });

server.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("login");
});
module.exports = router;