const session = require("express-session");
const db = require("../Models/conexion");
const bcrypt = require("bcrypt");

const getLogin = async (req, res) => {
  try {
    res.render("../views/login");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { u_correo, u_password } = req.body;
  db.query(
    "SELECT * FROM Usuarios WHERE u_correo = ?",
    [u_correo],
    async (error, results) => {
      console.log(results);
      if (error) {
        console.error(error);
      } else {
        if (results.length > 0) {
          const user = results[0];
          const validacion = await bcrypt.compare(u_password, user.u_password);
          if (validacion) {
            req.session.user = {
              id: user.id,
              nombreUsuario: user.usuario,
            };
            const sessionData = req.session.user;
            console.log(sessionData);

            const userRol = user.fk_tipo_usuario;
            res.json({
              success: true,
              role: userRol,
              message: "Bienvenido",
            });
          } else res.json({ success: false, message: "Contraseña incorrecta" });
        } else console.log("");
      }
    }
  );
};

module.exports = {
  getLogin,
  login,
};
