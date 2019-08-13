const fs = require('fs');
const db = require('../common/db');

const readSql = (filePath) => fs.readFileSync(filePath, 'utf-8');


/**
 * Queries the database as a promise
 * @param sql the db statement to execute
 * @param params the parameters to use in the query (optional)
 * @returns {Promise<any>} returns a promise for use in async/await
 */
function dbGet(sql, params = []) {

    // console.log(`db: ${db}, params: ${params}`);
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

module.exports = {
    readSql: readSql,
    dbGet: dbGet
};