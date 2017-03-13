import * as db from '../services/dbProvider';
import * as Translator from '../translator/UserTranslator'
var passwordHash = require('password-hash');
var uuid = require('uuid');


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



export function checkCredentials (email: string , password:string){
  // var tempEmail = email.toLowerCase();
    // var hashedPassword = passwordHash.generate(password);
    // console.log('esta es la pass que vas a guardar !!!!!!',hashedPassword);
    var params = { email:email.toLowerCase() };
    //  var params = [  email.toLowerCase(), password];
    // var params = [email];
    var query :string = null;
 query = 'select * from usuarios where ?';
  console.log (query,params);
 
  return db.run2(query,params).then(result => {
    console.log ('ya porfavor ',result);
      if (result.length == 1 && result[0].member_active==1) {
        console.log('Entro al Lenghth',result);
         if (passwordHash.verify(password, result[0].password))
          return result;
        else
          return null;
        
        // return result;
      }
      else
      console.log ('There is 2 account with same email.');
        return null;
    })
    .catch(function (err) {
      console.log ('hubo error user dao login catch');
      console.log(err);
    });
    // return 'ya please';
}


// req.body.firstName
//                   ,req.body.lastName
//                   ,req.body.birth
//                   ,req.body.gender
//                   ,req.body.password
//                   ,req.body.email

export function register (firstName: string , lastName:string , birth:string , gender:string,password:string,email:string){
  var typeuser='admin';
  var token = uuid.v1();
  var member_active=0;
  var hashedPassword = passwordHash.generate(password);

    var params = [  firstName,
                    lastName,
                   birth,
                   gender,
                    hashedPassword,
                    typeuser,
                    member_active,
                    email.toLowerCase() ,
                    token
                  ];
    var query :string = null;
 query = "INSERT INTO usuarios (`id_user`, `name`,`last_name`,`birthdate`,`gender`, `password`, `typeuser`, `member_active`, `email`,`token`)";
query = query +
'VALUES  (null,?,?,?,?,?,?,?,?,?)' ;
console.log (query,params);

 
  return db.run2(query,params).then(result => {
    console.log('show me the money',result);
      if (result!= null) {
      result['token']=token;
      // console.log('show me the money2',result);
        return result;
      }
      else
      console.log ('hubo error1 en el register null');
        return null;
    })
    .catch(function (err) {
      console.log ('hubo error user dao register catch');
      console.log(err);
    });
    // return 'ya please';
}


export function activateAccount(token: string) {
  var params = { token: token };

  var query:string =null;
  var queryForCheck:string =null;
  queryForCheck="select * from usuarios where ?";
  query="update usuarios set member_active=1 where  ?";

   return db.run2(queryForCheck, params)
    .then(result => {
      // console.log('estoy en el activate account1 ',result);
  //el result hay que sacarle el primer object
      if (result[0].member_active == 1){
        // console.log('estoy en el activate account1.2 ',result);
          result.message = 'Your account has been already activated';
          return result;
      }else {
            return db.run2(query, params)  .then(result => {     
          // console.log('estoy en el activate account3 ',result);
          result.message = 'Your Account has been activated!';
          return result;
          }) .catch(function(err) {
            console.log(err);
          });
       
      }

    })
    .catch(function (err) {
      console.log(err);
    });
}