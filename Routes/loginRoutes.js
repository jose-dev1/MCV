const express = require("express");
const loginController = require("../Controllers/loginController");
const rutaLogin = express.Router();

rutaLogin.get("/", loginController.getLogin);
rutaLogin.post("/", loginController.login);
rutaLogin.post("/logout", loginController.logout);

module.exports = rutaLogin;
