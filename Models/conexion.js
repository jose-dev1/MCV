const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mcv",
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión a la base de datos exitosa");
});

process.on("SIGINT", () => {
  connection.end();
  process.exit();
});

module.exports = connection;
