const express = require("express");
const homeRoutes = require("./Routes/homeRoutes");
const loginRoutes = require("./Routes/loginRoutes");
const registroRoutes = require("./Routes/registroRoutes");
const contactoRoutes = require("./Routes/contactoRouter");
const perfilRoutes = require("./Routes/perfilRouter");
const agendarRoutes = require("./Routes/agendarRouter");
const agregarempleadoRoutes = require("./Routes/agregarempleadoRouter");
const homevetRoutes = require("./Routes/hveterinarioRouter");
const auxhomeRoutes = require("./Routes/auxhomeRoutes");
const gromerRoutes = require("./Routes/gromerhomeRoutes");
const crypto = require("crypto");
const app = express();
const session = require("express-session");
const cokkieParser = require("cookie-parser");

app.use(cokkieParser());

// Genera una cadena secreta aleatoria para el secret
const secret = crypto.randomBytes(32).toString("hex");

// Configuracion el middleware de express-session con el secret generado
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Debe configurarse en true cuando se utiliza SameSite "None" en un sitio con HTTPS
      sameSite: "none", // Configura SameSite en "None" para permitir cookies en contextos de terceros
    },
  })
);

/** Aqui inicia las rutas del home,directorio publico y la configuracion urlcoded para analizar formularios post  */
app.use(express.urlencoded({ extended: false }));
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

/** Aqui inicia  las rutas del veterinario */
app.use("/homeVeterinario", homevetRoutes);

/** Aqui inicia  las rutas del Auxiliar */
app.use("/homeAuxiliar", auxhomeRoutes);

/** Aqui inicia  las rutas del Groomer */
app.use("/homeGroomer", gromerRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
