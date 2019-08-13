const fs = require('fs');

const readSql = (filePath) => fs.readFileSync(filePath, 'utf-8');

module.exports = {
    readSql: readSql
};