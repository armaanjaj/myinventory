var mysql = require("mysql");
require("dotenv").config();

var pool = mysql.createPool({
    connectionLimit:1000,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

module.exports = pool;