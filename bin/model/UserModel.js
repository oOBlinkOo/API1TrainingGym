"use strict";
var UserModel = (function () {
    function UserModel() {
        this.nodeId = null;
        this.name = null;
        this.email = null;
        this.password = null;
        this.createdOn = null;
        this.lastLogin = null;
        this.lastGraph = null;
        this.licenseExpiration = null;
        this.profilePicture = null;
        this.domainId = null;
        this.token = null;
        this.active = null;
    }
    return UserModel;
}());
exports.UserModel = UserModel;
