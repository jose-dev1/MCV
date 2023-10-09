const express = require("express");
const hveterinarioController = require("../Controllers/hvetrinarioController");

const rutaHveterinario = express.Router();
rutaHveterinario.get("/", hveterinarioController.getVeterinario);

module.exports = rutaHveterinario;
