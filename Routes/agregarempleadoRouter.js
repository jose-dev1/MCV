const express = require("express");
const agregarempleadoController = require("../Controllers/agregarempleadoController");

const rutaAgregar = express.Router();
rutaAgregar.get("/", agregarempleadoController.getAgegarempleado);

module.exports = rutaAgregar;
