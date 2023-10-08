const express = require("express");
const contactoController = require("../Controllers/contactoController");

const rutaContacto = express.Router();
rutaContacto.get("/", contactoController.getContacto);

module.exports = rutaContacto;
