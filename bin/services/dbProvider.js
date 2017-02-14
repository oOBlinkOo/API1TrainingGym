var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gymbd'
});
connection.connect();
connection.query('SELECT * from  Ejercicios', function (err, rows, fields) {
    if (err)
        throw err;
    console.log('The solution is: ', rows[0].solution);
});
connection.end();
// export function run(query: string, params?: any) {
//  var session = null;
//   var result = null;
// } 
