import * as db from '../services/dbProvider';
import * as Translator from '../translator/UserTranslator'
var passwordHash = require('password-hash');


export function checkCredentials (email: string , password:string){
    var params = { email: email.toLowerCase() };
  return db.run('select email,password from usuarios',params).then(result => {
      if (result.records.length == 1) {
        let userModel = Translator.JsonToUser(result.records[0]);
        if (passwordHash.verify(password, userModel.password))
          return userModel;
        else
          return null;
      }
      else
        return null;
    })
    .catch(function (err) {
      console.log(err);
    });
    // return 'ya please';
}