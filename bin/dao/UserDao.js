"use strict";
var db = require("../services/dbProvider");
var Translator = require("../translator/UserTranslator");
var passwordHash = require('password-hash');
// export function checkCredentials (email: string , password:string){
//     var params = { email: email.toLowerCase() };
//   return db.run('select email,password from usuarios',params).then(result => {
//       if (result.records.length == 1) {
//         let userModel = Translator.JsonToUser(result.records[0]);
//         if (passwordHash.verify(password, userModel.password))
//           return userModel;
//         else
//           return null;
//       }
//       else
//         return null;
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
//     // return 'ya please';
// }
function checkCredentials(email, password) {
    var params = { email: email.toLowerCase() };
    var query = null;
    query = 'select * from usuarios where email=?';
    console.log(query, email);
    return db.run(query, email).then(function (result) {
        console.log('ya porfavor ', result);
        if (result.records.length == 1) {
            console.log('aqui esta fallando', result);
            var userModel = Translator.JsonToUser(result.records[0]);
            // if (passwordHash.verify(password, userModel.password))
            //   return userModel;
            // else
            //   return null;
            console.log('aquii estoy hija', userModel);
            return userModel;
        }
        else
            return null;
    })
        .catch(function (err) {
        console.log(err);
    });
    // return 'ya please';
}
exports.checkCredentials = checkCredentials;
