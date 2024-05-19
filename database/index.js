const mysql = require("mysql2/promise");

// Create the connection pool. The pool-specific settings are the defaults
const connection = mysql.createPool({
  host: "185.232.14.52",
  user: "u898129453_gaox",
  database: "u898129453_gaox",
  password: "Anhem12!",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
module.exports = connection;
