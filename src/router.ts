import * as UserController from './controller/UserController';


import express = require('express');

export function defineRoutes(app: express.Application) {
  app.use('/user', UserController.router);

}