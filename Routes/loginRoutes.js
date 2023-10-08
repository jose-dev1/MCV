const express = require("express");
const loginController = require("../Controllers/loginController");

const rutaLogin = express.Router();
rutaLogin.get("/", loginController.getLogin);

module.exports = rutaLogin;
