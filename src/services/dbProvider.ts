var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'gymbd'
})


export function run(query: string, params?: any) {
var result = null;
connection.connect();

connection.query(query,params, function(err, rows, fields) {
  if  (err) {
    console.error('error connecting: ' + err.stack);
    // return;
     throw err;
  }
  result=rows;
  console.log('The solution is: ', result);
  return result;
});

connection.end();
return result;
}