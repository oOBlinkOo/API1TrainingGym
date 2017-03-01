"use strict";
var db = require("../services/dbProvider");
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
    // var tempEmail = email.toLowerCase();
    var params = { email: email.toLowerCase() };
    // var params = [email];
    var query = null;
    query = 'select * from usuarios where ?';
    console.log(query, params);
    return db.run2(query, params).then(function (result) {
        console.log('ya porfavor ', result);
        if (result[0].member_active == 1) {
            console.log('aqui esta fallando', result);
            // let userModel = Translator.JsonToUser(result);
            // if (passwordHash.verify(password, userModel.password))
            //   return userModel;
            // else
            //   return null;
            console.log('aquii estoy hija', result);
            return result;
        }
        else
            console.log('hubo error1 en el null');
        return null;
    })
        .catch(function (err) {
        console.log('hubo error user dao login catch');
        console.log(err);
    });
    // return 'ya please';
}
exports.checkCredentials = checkCredentials;
// req.body.firstName
//                   ,req.body.lastName
//                   ,req.body.birth
//                   ,req.body.gender
//                   ,req.body.password
//                   ,req.body.email
function register(firstName, lastName, birth, gender, password, email) {
    var typeuser = 'admin';
    var member_active = 1;
    // var gym_if=null;
    // var gym_id=null;
    // var params = {  name:firstName,
    //                 last_name:lastName,
    //                 birthdate:birth,
    //                 gender:gender,
    //                 password:password,
    //                 typeuser:typeuser,
    //                 member_active:member_active,
    //                 email: email.toLowerCase() 
    //               };
    var params = [firstName,
        lastName,
        birth,
        gender,
        password,
        typeuser,
        member_active,
        email.toLowerCase()
    ];
    var query = null;
    query = "INSERT INTO usuarios (`id_user`, `name`,`last_name`,`birthdate`,`gender`, `password`, `typeuser`, `member_active`, `email`)";
    query = query +
        'VALUES  (null,?,?,?,?,?,?,?,?)';
    console.log(query, params);
    return db.run2(query, params).then(function (result) {
        console.log('show me the money', result);
        if (result != null) {
            return result;
        }
        else
            console.log('hubo error1 en el register null');
        return null;
    })
        .catch(function (err) {
        console.log('hubo error user dao register catch');
        console.log(err);
    });
    // return 'ya please';
}
exports.register = register;
