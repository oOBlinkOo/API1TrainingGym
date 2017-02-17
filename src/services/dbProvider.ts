var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gymbd'
})



export function run(query: string, params?: any)  {
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
        
        return rows;
        
    

      });
      // .then(
      //   res => {
      //   connection.end();
      //   return res;
      // });

  
} catch (error) {
  console.log('3');
  console.log ('disable for testing waaat',error);
  connection.end();

}
console.log('4');
console.log('llego al final del metodo run',result);
return result;
}

// exports.run2 = function(query, params, done) {
//   connection.connect();
//      connection.query(query,params,function(err,rows,fields){
//        connection.end();
//         console.log('The solution is: ', rows)
//         console.log ('ni idea',err);
//        done(null ,rows);
//      });
// }
