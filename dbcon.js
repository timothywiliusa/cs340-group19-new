var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_jacomatt',
  password        : 'strongpassword',
  database        : 'cs340_jacomatt'
});
module.exports.pool = pool;
