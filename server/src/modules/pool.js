var mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit:100,
    host: "localhost",
    port: 3307,
    user: "root",
    password: "password",
    database: "inventorydb"
    // host: process.env.db_host,
    // port: process.env.db_port,
    // user: process.env.db_user,
    // password: process.env.db_password,
    // database: process.env.db_database
});

module.exports = pool;