import * as LoginController from './controller/loginController';


import express = require('express');

export function defineRoutes(app: express.Application) {
  app.use('/login', LoginController.router);

}