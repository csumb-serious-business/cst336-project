const express = require("express");
const router = express.Router();
const db = require('../common/db');


const SQL = {
    titles: db.sqlFrom('app/sql/get-titles.sql'),
    types: db.sqlFrom('app/sql/get-types.sql'),
    materials: db.sqlFrom('app/sql/get-materials.sql'),
    artists: db.sqlFrom('app/sql/get-artists.sql'),
    search: db.sqlFrom('app/sql/call-smp.sql')
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
    async (req, res) => res.send(await db.get(SQL.search, req.query.params)
        .catch(e => [])
    )
);


module.exports = router;