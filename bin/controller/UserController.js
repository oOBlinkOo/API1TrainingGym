"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userDAO = require("../dao/UserDao");
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
// http://localhost:8100/
var siteUrl = process.env.UI_URL || 'http://localhost:3000';
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
    userDAO.register(req.body.firstName, req.body.lastName, req.body.birth, req.body.gender, req.body.password, req.body.email).then(function (response) {
        if (response != null) {
            if (response.member_active == 1) {
                req.session['user'] = response;
            }
            res.statusCode = 200;
            console.log('antes de enviar la respuesta', response);
            res.send(response);
            //   console.log('mandando el correo',userModel);
            var auth = {
                auth: {
                    api_key: 'key-1cd4762f5aae084c3f8098c9c5bc5b02',
                    domain: 'sandbox69ce2f85c7db4616b0db058df5b5c621.mailgun.org'
                }
            };
            var nodemailerMailgun = nodemailer.createTransport(mg(auth));
            console.log(siteUrl);
            nodemailerMailgun.sendMail({
                from: 'test@gymtrainning.com',
                to: req.body.email,
                subject: 'Activate your Gym Trainning Account!',
                html: '<b>Please click the link below</b><p><a href="' + siteUrl + '/user/activate/' + response.token + '">Activate you account!</a></p>',
            }, function (err, info) {
                if (err) {
                    console.log('Error: ' + err);
                }
                else {
                    console.log('Response: ' + JSON.stringify(info));
                }
            });
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
exports.router.get('/activate/:token', function (req, res) {
    if (req.params.token) {
        var token = req.params.token;
        userDAO.activateAccount(token).then(function (data) {
            //    res.json(data)
            return res.render('index', { title: 'Gym Trainning', message: data.message });
        });
    }
    else
        return res.json(null);
});
