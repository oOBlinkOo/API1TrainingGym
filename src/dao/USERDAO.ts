import * as db from '../services/dbProvider';
var x= null;


export function checkCredentials (email: string , password:string){
    var params = { email: email.toLowerCase() };
  return db.run('select * from usuarios',params);
    // return 'ya please';
}