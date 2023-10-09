const express = require("express");
const auxhomeController = require("../Controllers/auxhomeController");

const rutaAux = express.Router();
rutaAux.get("/", auxhomeController.getAuxiliar);

module.exports = rutaAux;
