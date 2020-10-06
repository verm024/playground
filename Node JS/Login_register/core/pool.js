const util = require('util');
const mysql = require('mysql');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "logreg",
});

pool.getConnection((err, connection) => {
    if(err)
        console.error(err);
    
    if(connection)
        connection.release();
    return;
});

pool.query(util.promisify(pool.query));

module.exports = pool;