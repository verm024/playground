const mysql = require("mysql");
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "logreg2"
});

pool.getConnection((err, conn) => {
    if(err){
        console.error(err);
    }   
    else{
        conn.release();
    }
    return;
});

pool.query = (util.promisify(pool.query));

module.exports = pool;