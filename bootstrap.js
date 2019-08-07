const mysql = require('mysql');
const json = require('json5');
const readFile = require('fs').readFileSync;
const parse = require('csv-parse');
secrets = json.parse(readFile('secrets/db.json5'));

// console.log(query);
const conn = mysql.createConnection({
    host: 'localhost',
    database: 'serious_cst336',
    user: secrets.user,
    password: secrets.password,
    multipleStatements: true
});

let result;
let query;
//// create temp table & load csv -- INFILE security workaround
// read csv

// create temp table
query = readFile('sql/oltp-temp-create.sql', 'utf-8');
result = conn.query(query);

// load table

//// populate biz tables from temp
// query = readFile('sql/oltp-load.sql', 'utf-8');
// result = conn.query(query);


//// clear temp
