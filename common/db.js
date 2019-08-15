const mysql = require('mysql');
const json = require('json5');
const fs = require('fs');

secrets = json.parse(fs.readFileSync('secrets/db.json5'));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    database: 'serious_cst336',
    user: secrets.user,
    password: secrets.password
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release();

});


/**
 * Queries the database as a promise
 * @param sql the db statement to execute
 * @param params the parameters to use in the query (optional)
 * @returns {Promise<any>} returns a promise for use in async/await
 */
function get(sql, params = []) {
    console.log(params);
    if (params.length > 0) {
        //replace tokens from prepared statement
        let clean = params.map(p =>
            p.length === 0 ? null : p
        );
        sql = mysql.format(sql, clean);
    }

    console.log(`sql: ${sql}`);
    return new Promise((resolve, reject) => {
        pool.query(sql,
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


const sqlFrom = (filePath) => fs.readFileSync(filePath, 'utf-8');
module.exports = {
    get: get,
    sqlFrom: sqlFrom
};