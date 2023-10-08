const express = require("express");
const homeRoutes = require("./Routes/homeRoutes");
const loginRoutes = require("./Routes/loginRoutes");
const registroRoutes = require("./Routes/registroRoutes");
const contactoRoutes = require("./Routes/contactoRouter");
const perfilRoutes = require("./Routes/perfilRouter");
const agendarRoutes = require("./Routes/agendarRouter");
const agregarempleadoRoutes = require("./Routes/agregarempleadoRouter");

const app = express();

/** Aqui inicia las rutas del home y el directorio publico */
app.set("view engine", "ejs");
app.use(express.static("Asset"));
app.use("/", homeRoutes);
app.use("/login", loginRoutes);
app.use("/registro", registroRoutes);
app.use("/contacto", contactoRoutes);

/** Aqui inicia  las rutas del cliente */
app.use("/perfil", perfilRoutes);
app.use("/agendarCita", agendarRoutes);

/** Aqui inicia  las rutas de Administrador */
app.use("/agregarEmpleado", agregarempleadoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
