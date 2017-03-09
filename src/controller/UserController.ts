import * as express from 'express';
import * as userDAO from '../dao/UserDao';
import * as userModel from '../model/UserModel';

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

export var router:express.Router = express.Router();

/* GET home page. */
// router.get('/login', function(req, res, next) {
//   console.log('llegamos hasta aqui');
//   userDAO.checkCredentials(req.body.email,req.body.password).then(function(userModel:userModel.UserModel){
//       if(userModel != null)
//       {
//           if (userModel.active == 1)
//           {
//             req.session['user'] = userModel;
//           }
//           res.statusCode = 200;
//           res.send(userModel);
//       }
//       else{  
//           res.statusCode = 200;
//           res.send(false);
//       }
//   })
//     .catch(error => {
//       res.statusCode = 500;
//       res.json(error);
//     });


// });

router.post('/login', function(req, res, next) {
  console.log('llegamos hasta aqui');
  userDAO.checkCredentials(req.body.email,req.body.password).then(function(userModel:userModel.UserModel){
      if(userModel != null)
      {
          if (userModel.member_active == 1)
          {
            req.session['user'] = userModel;
          }
          res.statusCode = 200;
          console.log(userModel);
          res.send(userModel);
      }
      else{  
          res.statusCode = 200;
          res.send(false);
      }
  })
    .catch(error => {
      res.statusCode = 500;
      res.json(error);
    });


});

router.post('/register', function(req, res, next) {
  console.log('registerUserController');
  userDAO.register(req.body.firstName
                  ,req.body.lastName
                  ,req.body.birth
                  ,req.body.gender
                  ,req.body.password
                  ,req.body.email
                  ).then(function(response){
      if(response != null)
      {
          if (response.member_active == 1)
          {
            req.session['user'] = response;
          }
          res.statusCode = 200;
          console.log('antes de enviar la respuesta',response)
          res.send(response);
        //   console.log('mandando el correo',userModel);
             var auth = {
                auth: {
                    api_key: 'key-1cd4762f5aae084c3f8098c9c5bc5b02',
                    domain: 'sandbox69ce2f85c7db4616b0db058df5b5c621.mailgun.org'
                }
            }
         var nodemailerMailgun = nodemailer.createTransport(mg(auth));
           nodemailerMailgun.sendMail({
            from: 'test@gymtrainning.com',
            to: req.body.email, // An array if you have multiple recipients.
            subject: 'Activate your Process Tempo Account!',
            html: '<b>Please click the link below</b><p><a href="'+'www.aguantalascarnes'+'/public/user/activate/' + response.token + '">Activate you account!</a></p>',
            }, function (err, info) {
                if (err) {
                    console.log('Error: ' + err);
                }
                else {
                    console.log('Response: ' + JSON.stringify(info));
                }
            });

     


      }
      else{  
          res.statusCode = 200;
          res.send('User Was not Register');
      }
  })
    .catch(error => {
      res.statusCode = 500;
      res.json(error);
    });


});





