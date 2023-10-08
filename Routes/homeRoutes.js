const express = require("express");
const homeController = require("../Controllers/homeController");

const rutaHome = express.Router();
rutaHome.get("/", homeController.getHome);

module.exports = rutaHome;
