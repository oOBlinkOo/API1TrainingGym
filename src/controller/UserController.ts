import * as express from 'express';
export var router:express.Router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  console.log('llegamos hasta aqui');
});


