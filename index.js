const express = require("express");
const cors = require("cors");
const loginRoutes = require("./Routes/loginRoutes");
const crypto = require("crypto");
const app = express();
const session = require("express-session");
const cokkieParser = require("cookie-parser");
const bodyParser = require("body-parser");

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

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
/** Aqui inicia las rutas del home,directorio publico y la configuracion urlcoded para analizar formularios post  */
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/postLogin", loginRoutes);

/** Aqui inicia  las rutas del cliente */

/** Aqui inicia  las rutas de Administrador */

/** Aqui inicia  las rutas del veterinario */

/** Aqui inicia  las rutas del Auxiliar */

/** Aqui inicia  las rutas del Groomer */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
