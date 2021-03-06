const express = require("express");
const router = express.Router();
const db = require('../common/db');

const login = require('./login');

// pre-load sql queries
const SQL = {
    // search options
    types: db.sqlFrom('app/sql/ms-types.sql'),
    materials: db.sqlFrom('app/sql/ms-materials.sql'),
    artists: db.sqlFrom('app/sql/ms-artists.sql'),
    // reports
    artistValue: db.sqlFrom('admin/sql/rp-artist-value.sql'),
    // crud
    invItemCreate: db.sqlFrom('admin/sql/inv-item-create.sql'),
    invItemRead: db.sqlFrom('admin/sql/inv-item-read.sql'),
    invItemUpdate: db.sqlFrom('admin/sql/inv-item-update.sql'),
    invItemDelete: db.sqlFrom('admin/sql/inv-item-delete.sql'),
};

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

// todo change to api call
router.get('/admin/signin',
    async (req, res) => res.render('admin/signin.njk'));

router.get('/admin/account-home',
    async (req, res) => res.render('admin/account-home.njk'));


/* admin api routes **********************************************************/
//// search
router.get('/api/admin/inv-search-options',
    async (req, res) => res.send({
        types: await db.get(SQL.types).catch(e => []),
        materials: await db.get(SQL.materials).catch(e => []),
        artists: await db.get(SQL.artists).catch(e => [])
    })
);

//// reports
router.get('/api/admin/artist-value',
    async (req, res) => {
        let got = await db.get(SQL.artistValue).catch(e => []);
        res.send(got);
    });

//// crud
router.get('/api/admin/inv-item-create',
    async (req, res) => {
        let got = await db.get(SQL.invItemCreate, req.query.params).catch(e => []);
        res.send(got);
    });

router.get('/api/admin/inv-item-read',
    async (req, res) => {
        let got = await db.get(SQL.invItemRead, [req.query.iid]).catch(e => []);
        res.send(got[0])
    }
);

router.get('/api/admin/inv-item-update',
    async (req, res) => {
        let got = await db.get(SQL.invItemUpdate, req.query.params).catch(e => []);
        res.send(got);
    }
);

router.get('/api/admin/inv-item-delete',
    async (req, res) => {
        let got = await db.get(SQL.invItemDelete, req.query.params).catch(e => []);
        res.send(got);
    }
);

//// auth
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