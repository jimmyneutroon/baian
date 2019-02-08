mysql = require('mysql');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'baian'
});
connection.connect()
module.exports = connection;