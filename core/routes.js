const express = require("express");
const router = express.Router();
const db = require('./db');

//serve static asset files
router.use('/assets', express.static('./assets'));


// simple routes
router.get('/',
    async (req, res) => res.render('index.njk', {
        rows: await dbGetKeywords()
    }));


// catch all
router.get('/*', function (req, res) {
    return res.render('404');
});


function example(req, res) {

    // do something here if required, ie check for redirects

    return res.render('index.njk', {});

}

module.exports = router;

/**
 * Queries the database for a list of keywords
 * @returns {Promise<any>} returns a promised list of keywords
 */
function dbGetKeywords() {
    let sql = `SELECT DISTINCT keyword
               FROM favorites
               ORDER BY keyword`;
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
                    /* do nothing */
                }
                // console.log(result);
                return resolve(result);
            })
    })
}