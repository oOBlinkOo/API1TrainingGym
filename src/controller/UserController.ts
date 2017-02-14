import * as express from 'express';
import * as userDAO from '../dao/UserDao';
import * as userModel from '../model/UserModel';

export var router:express.Router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  console.log('llegamos hasta aqui');
  userDAO.checkCredentials(req.body.email,req.body.password).then(function(userModel:userModel.UserModel){
      if(userModel != null)
      {
          if (userModel.active == 1)
          {
            req.session['user'] = userModel;
          }
          res.statusCode = 200;
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


