const mysql = require('mysql');
const json = require('json5');
const fs = require('fs');
const parse = require('csv-parse');
const SECRETS = json.parse(fs.readFileSync('secrets/db.json5'));


const CONNECTION = mysql.createConnection({
    host: 'localhost',
    user: SECRETS.user,
    password: SECRETS.password,
    multipleStatements: true,
});

// database: 'serious_cst336',

/**
 * populates the OLTP (biz tables) with data from artwork.csv
 * @param fullRebuild if true clear (DROP) the existing database
 * and execute a full rebuild from the csv file
 */
function main(fullRebuild = false) {
    if (fullRebuild) {
        console.log(`fully rebuilding the database`);
        db('sql/oltp/create-schema.sql');
    }
    fs.createReadStream('sql/data/artwork.csv')
        .pipe(parse({delimiter: ','}, _procCSV));
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
    await db('sql/oltp/temp-art-create.sql');


    console.log(`populating temp_art table from csv contents`);
    await data.shift(); // skip header row
    data.forEach(line => {
        // console.log(`line: ${line}`);
        db('sql/oltp/temp-art-insert.ps.sql', [...line])
    });

    console.log(`populating DB from temp_art table`);
    await db('sql/oltp/temp-art-to-db.sql');

    // remove temp art
    console.log(`remove temp_art table`);
    await db('sql/oltp/temp-art-remove.sql')
}

/**
 * Queries the database as a promise
 * @param sqlFile the sql statement to execute
 * @param params the parameters to use in the query (optional)
 * @return result
 */
function db(sqlFile, params = []) {
    let sql = fs.readFileSync(sqlFile, 'utf-8');

    // console.log(`sql: ${sql}, params: ${params}`);
    CONNECTION.query(sql, params,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            // console.log(result);
            return result;
        })
}


main(false);
