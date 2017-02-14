"use strict";
var LoginController = require("./controller/UserController");
function defineRoutes(app) {
    app.use('/user', LoginController.router);
}
exports.defineRoutes = defineRoutes;
