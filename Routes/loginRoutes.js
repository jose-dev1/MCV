const express = require("express");
const loginController = require("../Controllers/loginController");
const rutaLogin = express.Router();

rutaLogin.get("/", loginController.getLogin);
rutaLogin.post("/", loginController.login);

rutaLogin.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/");
  });
});

module.exports = rutaLogin;
