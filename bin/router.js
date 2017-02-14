"use strict";
var LoginController = require("./controller/loginController");
function defineRoutes(app) {
    app.use('/login', LoginController.router);
}
exports.defineRoutes = defineRoutes;
