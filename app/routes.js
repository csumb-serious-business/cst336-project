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

module.exports = router;