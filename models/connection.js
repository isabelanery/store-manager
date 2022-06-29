const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'perS1Stencia',
  database: 'StoreManager',
});

module.exports = connection;