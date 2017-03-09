"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userDAO = require("../dao/UserDao");
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
exports.router = express.Router();
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
exports.router.post('/login', function (req, res, next) {
    console.log('llegamos hasta aqui');
    userDAO.checkCredentials(req.body.email, req.body.password).then(function (userModel) {
        if (userModel != null) {
            if (userModel.member_active == 1) {
                req.session['user'] = userModel;
            }
            res.statusCode = 200;
            console.log(userModel);
            res.send(userModel);
        }
        else {
            res.statusCode = 200;
            res.send(false);
        }
    })
        .catch(function (error) {
        res.statusCode = 500;
        res.json(error);
    });
});
exports.router.post('/register', function (req, res, next) {
    console.log('registerUserController');
    userDAO.register(req.body.firstName, req.body.lastName, req.body.birth, req.body.gender, req.body.password, req.body.email).then(function (userModel) {
        if (userModel != null) {
            if (userModel.member_active == 1) {
                req.session['user'] = userModel;
            }
            res.statusCode = 200;
            console.log('estoy en el usercontroller este es el usermodel lets gogo', userModel);
            var auth = {
                auth: {
                    api_key: 'key-1cd4762f5aae084c3f8098c9c5bc5b02',
                    domain: 'sandbox69ce2f85c7db4616b0db058df5b5c621.mailgun.org'
                }
            };
            var nodemailerMailgun = nodemailer.createTransport(mg(auth));
            nodemailerMailgun.sendMail({
                from: 'postmaster@sandbox69ce2f85c7db4616b0db058df5b5c621.mailgun.org',
                to: req.body.email,
                subject: 'Activate your Process Tempo Account!',
                html: '<b>Please click the link below</b><p><a href="' + 'www.aguantalascarnes' + '/public/user/activate/' + 'token que no tengo' + '">Activate you account!</a></p>',
            }, function (err, info) {
                if (err) {
                    console.log('Error: ' + err);
                }
                else {
                    console.log('Response: ' + JSON.stringify(info));
                }
            });
            res.send(userModel);
        }
        else {
            res.statusCode = 200;
            res.send('User Was not Register');
        }
    })
        .catch(function (error) {
        res.statusCode = 500;
        res.json(error);
    });
});
