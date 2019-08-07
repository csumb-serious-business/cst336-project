const mysql = require('mysql');
const json = require('json5');
const readFile = require('fs').readFileSync;

secrets = json.parse(readFile('secrets/db.json5'));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    database: 'serious_cst336',
    user: secrets.user,
    password: secrets.password,
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

module.exports = pool;