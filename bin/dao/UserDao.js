"use strict";
var db = require("../services/dbProvider");
var Translator = require("../translator/UserTranslator");
var passwordHash = require('password-hash');
function checkCredentials(email, password) {
    var params = { email: email.toLowerCase() };
    return db.run('select email,password from usuarios', params).then(function (result) {
        if (result.records.length == 1) {
            var userModel = Translator.JsonToUser(result.records[0]);
            if (passwordHash.verify(password, userModel.password))
                return userModel;
            else
                return null;
        }
        else
            return null;
    })
        .catch(function (err) {
        console.log(err);
    });
    // return 'ya please';
}
exports.checkCredentials = checkCredentials;
