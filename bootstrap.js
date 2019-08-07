const mysql = require('mysql');
const json = require('json5');
const fs = require('fs');
const parse = require('csv-parse');
SECRETS = json.parse(fs.readFileSync('secrets/db.json5'));


const CONNECTION = mysql.createConnection({
    host: 'localhost',
    database: 'serious_cst336',
    user: SECRETS.user,
    password: SECRETS.password,
    multipleStatements: true
});


function populateOLTP() {
    fs.createReadStream('sql/data/artwork.csv')
        .pipe(parse({delimiter: ','}, _procCSV))
}

function _procCSV(err, data) {
    if (err) {
        console.log(`error: ${err}`);
        return;
    }

    console.log(`creating temp_art table`);
    db('sql/oltp/temp-art-create.sql');


    console.log(`populating temp_art table from csv contents`);
    data.shift(); // skip header row
    data.forEach(line => {
        console.log(`line: ${line}`);
        db('sql/oltp/temp-art-insert.ps.sql', [...line])
    });

    console.log(`populating DB from temp_art table`);
    db('sql/oltp/temp-art-to-db.sql');

    // remove temp art
    console.log(`remove temp_art table`);
    db('sql/oltp/temp-art-remove.sql')
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


populateOLTP();
