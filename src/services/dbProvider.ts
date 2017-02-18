var mysql = require('mysql');
var Promise = require('promise');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gymbd'
})



export function run(query: string, params?: any, callback ?: any)  {
var result = null;

connection.connect();

try {
  console.log('1');
  connection.query(query,params,function(err,rows,fields){
    console.log('2');
      if  (err) {
          console.error('error connecting: ' + err.stack);
          throw err;
        }
        result=rows;
        console.log('The solution is: ', result)
        console.log ('ni idea',err);
        // console.log ('ni fields',fields);
        callback(null,rows)
        // return rows;

      });
} catch (error) {
  console.log('3');
  console.log ('disable for testing waaat',error);
  connection.end();

}
console.log('4');
console.log('llego al final del metodo run',result);
return result;
}

export function run2(query: string, params?: any)  {
  connection.connect();
return new Promise(function (fulfill, reject){
            connection.query(query,params,function(err,rows,fields){
         if  (err) {
          console.error('error connecting: ' + err.stack);

          // throw err;
          connection.end();
          return reject(err);
          
        }
        connection.end();
        fulfill(rows);


      }); //done

});

}
