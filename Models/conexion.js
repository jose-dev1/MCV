const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "bhhxgzdkubqi9cwfcd2d-mysql.services.clever-cloud.com",
  user: "u7peyuodpbxor70h",
  password: "JOhXnw0XESxUoqMcWf3t",
  database: "bhhxgzdkubqi9cwfcd2d",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión a la base de datos exitosa");
});

process.on("SIGINT", () => {
  db.end();
  process.exit();
});

module.exports = db;
