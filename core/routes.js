const express = require("express");
const router = express.Router();
const db = require('./db');
const readSQL = require('./common').readSql;

const SQL = {
    titles: readSQL('sql/app/get-titles.sql'),
    types: readSQL('sql/app/get-types.sql'),
    materials: readSQL('sql/app/get-materials.sql'),
    artists: readSQL('sql/app/get-artists.sql'),
    search: readSQL('sql/app/search-masterpieces.ps.sql')
};

//serve static asset files
router.use('/assets', express.static('./assets'));


// app routes
router.get('/',
    async (req, res) => res.render('app/root.njk', {
        titles: await dbGet(SQL.titles),
        types: await dbGet(SQL.types),
        materials: await dbGet(SQL.materials),
        artists: await dbGet(SQL.artists)
    }));

// admin routes
router.get('/admin',
    async (req, res) => res.render('admin/root.njk', {
        /* todo add admin forms */
    }));

// catch all
router.get('/*', function (req, res) {
    return res.render('404');
});


function example(req, res) {
    // do something here if required, ie check for redirects
    return res.render('app/root.njk', {});
}

module.exports = router;

/**
 * Queries the database for a list of keywords
 * @returns {Promise<any>} returns a promised list of keywords
 */
function dbGet(sql) {
    return dbPromise(sql);
}

/**
 * Queries the database as a promise
 * @param sql the sql statement to execute
 * @param params the parameters to use in the query (optional)
 * @returns {Promise<any>} returns a promise for use in async/await
 */
function dbPromise(sql, params = []) {

    // console.log(`sql: ${sql}, params: ${params}`);
    return new Promise((resolve, reject) => {
        db.query(sql,
            params,
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                // console.log(result);
                return resolve(result);
            })
    })
}