const db = require("../Models/conexion");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { u_correo, u_password } = req.body;
  console.log(req);
  db.query(
    "SELECT * FROM Usuarios WHERE u_correo = ?",
    [u_correo],
    async (error, results) => {
      console.log(results);
      if (error) {
        console.error(error);
        res.json({ success: false, message: "Error en la base de datos" });
      } else {
        if (results.length > 0) {
          const user = results[0];

          const validacion = await bcrypt.compare(u_password, user.u_password);
          if (validacion) {
            const userRol = user.fk_tipo_usuario;
            res.json({
              success: true,
              role: userRol,
              user: user,
              message: "Inicio de sesión exitoso",
            });
          } else {
            res.json({
              success: false,
              message: "Sus credenciales son incorrectas",
            });
          }
        } else {
          res.json({
            success: false,
            message:
              "El correo electrónico ingresado no se en cuentra registrado",
          });
        }
      }
    }
  );
};

module.exports = {
  login,
};
