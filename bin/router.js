"use strict";
var UserController = require("./controller/UserController");
function defineRoutes(app) {
    app.use('/user', UserController.router);
}
exports.defineRoutes = defineRoutes;
