const express = require("express");
const login = require('./login');
const router = express.Router();

//serve static files
router.use('/admin', express.static('admin/public'));

// todo needed?
router.use(express.urlencoded({extended: true}));

/* admin page routes *********************************************************\
 * DON'T USE THESE PATHS:
 *    /    -- root path
 *    /*   -- catch all path
 * ***************************************************************************/
router.get('/admin',
    async (req, res) => res.render('admin/root.njk', {
        /* todo add app forms */
        example: await { /* some slow callback */}
    }));

router.get('/admin/signin',
    async (req, res) => res.render('admin/signin.njk'));


/* admin api routes **********************************************************/
router.post("/api/admin/signin", async (req, res) => {
    let user = req.body.username;
    let pass = req.body.password;

    //checks if username is in the database
    let result = await login.checkUsername(user);
    console.dir(result);

    // let hashedPwd = "$2a$05$r2tnsPeQXP/yWuh7.Mz3MO3zkUAposLywMXrsQ1EFZpf2ecvzw6mm";
    //initialize hashedPwd to blank
    let hashedPwd = "";

    //check if result is in the database
    if (result.length > 0) {
        hashedPwd = result[0].password;
    }

    let passwordMatch = await login.checkPassword(pass, hashedPwd);
    console.log("passwordMatch: " + passwordMatch);

    if (user === 'admin' && passwordMatch) {
        req.session.authenticated = true;
        res.redirect("/admin/account-home");
    } else {
        res.render("login", {"loginError": true});
    }
});

router.get("/account", login.isAuthenticated, function (req, res) {
    if (req.session.authenticated) {
        res.render("admin");
    } else {
        res.redirect("login");
    }
});

router.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("login");
});


// example of passing a function instead of anonymous
router.get('/example', example);

function example(req, res) {
    // do something here if required, ie check for redirects
    return res.render('admin/root.njk', {});
}

module.exports = router;