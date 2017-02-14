"use strict";
var LoginController = require("./controller/UserController");
function defineRoutes(app) {
    app.use('/login', LoginController.router);
}
exports.defineRoutes = defineRoutes;
