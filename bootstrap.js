const mysql = require('mysql');
const json = require('json5');
const fs = require('fs');
const parse = require('csv-parse');
const SECRETS = json.parse(fs.readFileSync('secrets/db.json5'));

const SQL = {};


const CONNECTION = mysql.createConnection({
    host: SECRETS.host,
    user: SECRETS.user,
    password: SECRETS.password,
    multipleStatements: true,
});

/**
 * populates the OLTP (biz tables) with data from artwork.csv
 * @param fullRebuild if true clear all tables
 * and execute a full rebuild from the csv file
 * @param createDB (for running in local env)
 * this will create a new db
 */
async function main(fullRebuild = false, createDB = false) {

    if (createDB) {
        await CONNECTION.query(`
        DROP DATABASE IF EXISTS ${SECRETS.database};
        CREATE DATABASE ${SECRETS.database};
        `,
            (err, result) => {
                if (err) {
                    console.log(err)
                }
                // console.log(result);
                return result;
            });
    }


    CONNECTION.changeUser({ database: SECRETS.database });
    console.log(`switched to db: ${SECRETS.database}`);

    if (fullRebuild) {
        console.log(`fully rebuilding the database`);
        await db('db/oltp/create-schema.sql');
    }
    await fs.createReadStream('db/data/artwork.csv')
        .pipe(parse({ delimiter: ',' }, _procCSV));
}

/**
 * processes a csv file, using its data to populate the OLTP database
 * @param err an error passed by the calling read stream
 * @param data the data returned by the calling read stream
 * @private
 */
async function _procCSV(err, data) {
    if (err) {
        console.log(`error: ${err}`);
        return;
    }

    console.log(`creating temp_art table`);
    await db('db/oltp/temp-art-create.sql');


    console.log(`populating temp_art table from csv contents`);
    await data.shift(); // skip header row
    data.forEach(line => {
        // console.log(`line: ${line}`);
        db('db/oltp/temp-art-insert.ps.sql', [...line])
    });

    console.log(`populating DB from temp_art table`);
    await db('db/oltp/temp-art-to-db.sql');

    // remove temp art
    console.log(`remove temp_art table`);
    await db('db/oltp/temp-art-remove.sql');

    // define stored procedures
    console.log(`adding stored procedures`);
    await db('db/stored-procs/inv-item-update.sp.sql');
    await db('db/stored-procs/inv-item-create.sp.sql');
    await db('db/stored-procs/inv-item-delete.sp.sql');
    await db('db/stored-procs/search-masterpieces.sp.sql');
}

/**
 * Queries the database as a promise
 * @param sqlFile the db statement to execute
 * @param params the parameters to use in the query (optional)
 * @return result
 */
async function db(sqlFile, params = []) {
    let read = await fs.readFileSync(sqlFile, 'utf-8');

    // can't use mysql delimiters
    // see: https://github.com/mysqljs/mysql/issues/1683

    // clear delimiters (and pray)
    let sql = read.toString()
        .replace(/DELIMITER\s..;/gm, '')
        .replace(/\$\$/gm, ';').replace(/DELIMITER\s;/gm, '');


    // console.log(`db: ${db}, params: ${params}`);
    CONNECTION.query(sql, params,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            // console.log(result);
            return result;
        })
}

main(true, true);