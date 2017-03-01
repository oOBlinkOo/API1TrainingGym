"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userDAO = require("../dao/UserDao");
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
