"use strict";
var mysql = require('mysql');
var Promise = require('promise');
var pool = mysql.createPool({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b8aa64b5fea4e4',
    password: '4e42143e',
    database: 'heroku_5addddbb07eeeed'
});
// export function run(query: string, params?: any, callback ?: any)  {
// var result = null;
// connection.connect();
// try {
//   console.log('1');
//   connection.query(query,params,function(err,rows,fields){
//     console.log('2');
//       if  (err) {
//           console.error('error connecting: ' + err.stack);
//           throw err;
//         }
//         result=rows;
//         console.log('The solution is: ', result)
//         console.log ('ni idea',err);
//         // console.log ('ni fields',fields);
//         callback(null,rows)
//         // return rows;
//       });
// } catch (error) {
//   console.log('3');
//   console.log ('disable for testing waaat',error);
//   connection.end();
// }
// console.log('4');
// console.log('llego al final del metodo run',result);
// return result;
// }
function run2(query, params) {
    console.log('cauntas conexiones pasan?');
    //   connection= mysql.createConnection({
    //   host: 'us-cdbr-iron-east-04.cleardb.net',
    //   user: 'b8aa64b5fea4e4',
    //   password: '4e42143e',
    //   database: 'heroku_5addddbb07eeeed'
    //   // host: 'localhost',
    //   // user: 'root',
    //   // password: '',
    //   // database: 'gymbd'
    // })
    // connection.connect();
    return new Promise(function (fulfill, reject) {
        console.log('entro el promise');
        pool.getConnection(function (err, connection) {
            connection.query(query, params, function (err, rows, fields) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    // throw err;
                    connection.release();
                    console.log('3');
                    return reject(err);
                }
                console.log('2');
                connection.release();
                fulfill(rows);
            }); //done
        });
        console.log('termino el promise');
    });
}
exports.run2 = run2;
