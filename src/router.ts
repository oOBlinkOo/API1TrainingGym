import * as LoginController from './controller/UserController';


import express = require('express');

export function defineRoutes(app: express.Application) {
  app.use('/login', LoginController.router);

}