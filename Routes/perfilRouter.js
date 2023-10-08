const express = require("express");
const perfilController = require("../Controllers/perfilController");

const rutaPerfil = express.Router();
rutaPerfil.get("/", perfilController.getPerfil);

module.exports = rutaPerfil;
