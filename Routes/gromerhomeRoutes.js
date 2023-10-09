const express = require("express");
const gromerhomeController = require("../Controllers/gromerhomeController");

const rutaGromer = express.Router();
rutaGromer.get("/", gromerhomeController.getGromer);

module.exports = rutaGromer;
