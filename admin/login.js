/**
 * Checks the bcrypt value of the password submitted
 * @param {string} password
 * @return {boolean} true if password submitted is equal to
 * bcrypt-hashed value, false otherwise.
 */
function checkPassword(password, hashedValue) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(password, hashedValue, function (err, result) {
            console.log("Result: " + result);
            resolve(result);
        });
    });
}

/**
 * This function checks if the username is in the database
 * @param {string} username
 */
function checkUsername(username) {
    let sql = "SELECT * FROM users WHERE username=?";
    return new Promise(function (resolve, reject) {
        let conn = createDBConnection();
        conn.connect(function (err) {
            if (err) throw err;
            conn.query(sql, [username], function (err, rows, fields) {
                if (err) throw err;
                console.log("Rows found: " + rows.length);
                resolve(rows);
                ;
            }); //query
        }); //connect
    }); //promise
}

function isAuthenticated(req, res, next) {
    if (!req.session.authenticated) {
        res.redirect('admin/account');
    } else {
        next()
    }
}

module.exports = {
    isAuthenticated: isAuthenticated,
    checkUsername: checkUsername,
    checkPassword: checkPassword
}