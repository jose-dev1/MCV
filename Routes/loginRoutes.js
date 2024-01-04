const express = require("express");
const loginController = require("../Controllers/loginController");
const rutaLogin = express.Router();

rutaLogin.post("/", loginController.login);

module.exports = rutaLogin;
