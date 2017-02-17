"use strict";
var Models = require("../model/UserModel");
function JsonToUser(json) {
    var newModel = new Models.UserModel();
    //record._fields[0].properties;
    // newModel.name = json._fields[json._fieldLookup['name']];
    // newModel.nodeId = json._fields[json._fieldLookup['nodeId']];
    // newModel.email = json._fields[json._fieldLookup['email']];
    // newModel.password = json._fields[json._fieldLookup['password']];
    // newModel.createdOn = json._fields[json._fieldLookup['createdOn']];
    // newModel.lastLogin = json._fields[json._fieldLookup['lastLogin']];
    // newModel.lastGraph = json._fields[json._fieldLookup['lastGraph']];
    // newModel.licenseExpiration = json._fields[json._fieldLookup['licenseExpiration']];
    // newModel.profilePicture = json._fields[json._fieldLookup['profilePicture']];
    // newModel.domainId = json._fields[json._fieldLookup['domainId']];
    // newModel.token = json._fields[json._fieldLookup['token']];
    // newModel.active = json._fields[json._fieldLookup['active']]['low'];
    newModel.id_user = json._fields[json._fieldLookup['id_user']];
    newModel.name = json.properties.name;
    newModel.password = json.properties.password;
    newModel.typeuser = json.properties.typeuser;
    newModel.member_active = json.properties.member_active;
    newModel.email = json.properties.email;
    return newModel;
}
exports.JsonToUser = JsonToUser;
