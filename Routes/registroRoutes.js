const express = require("express");
const registroController = require("../Controllers/registroController");

const rutaRegistro = express.Router();
rutaRegistro.get("/", registroController.getRegistro);

module.exports = rutaRegistro;
