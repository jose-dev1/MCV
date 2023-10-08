const express = require("express");
const homeRoutes = require("./Routes/homeRoutes");
const loginRoutes = require("./Routes/loginRoutes");
const registroRoutes = require("./Routes/registroRoutes");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("Asset"));
app.use("/", homeRoutes);
app.use("/login", loginRoutes);
app.use("/registro", registroRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
