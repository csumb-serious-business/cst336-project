const express = require("express");
const router = express.Router();
const db = require('../common/db');


const SQL = {
    titles: db.sqlFrom('app/sql/ms-titles.sql'),
    types: db.sqlFrom('app/sql/ms-types.sql'),
    materials: db.sqlFrom('app/sql/ms-materials.sql'),
    artists: db.sqlFrom('app/sql/ms-artists.sql'),
    search: db.sqlFrom('app/sql/ms-search-call.sql'),
    info: db.sqlFrom('app/sql/mi-details.ps.sql')
};

//serve static files
router.use('/app', express.static('app/public'));


/* app page routes ***********************************************************\
 * DON'T USE THIS PATH:
 *    /*   -- catch all path
 * ***************************************************************************/
router.get('/',
    async (req, res) => res.render('app/root.njk', {
        titles: await db.get(SQL.titles),
        types: await db.get(SQL.types),
        materials: await db.get(SQL.materials),
        artists: await db.get(SQL.artists)
    }));

/* app api routes ************************************************************/
router.get('/api/app/search-masterpieces',
    async (req, res) => {
        let got = await db.get(SQL.search, req.query.params).catch(e => []);
        res.send(got[0]);
    }
);

router.get('/api/app/masterpiece-info',
    async (req, res) => {
        let got = await db.get(SQL.info, [req.query.iid]).catch(e => []);
        res.send(got[0]);
    }
);


module.exports = router;