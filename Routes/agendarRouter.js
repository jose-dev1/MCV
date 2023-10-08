const express = require("express");
const agendarController = require("../Controllers/agendarController");

const rutaAgendar = express.Router();
rutaAgendar.get("/", agendarController.getAgendar);

module.exports = rutaAgendar;
