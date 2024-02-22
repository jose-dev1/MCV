import mysql from 'mysql2/promise'
import 'dotenv/config'

const DEFAULT_CONFIG = {
  host: process.env.HOST_DATABASE,
  user: process.env.USER_DATABASE,
  port: process.env.PORT_DATABASE,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

let connection

try {
  connection = await mysql.createConnection(connectionString)
  console.log('Conexión a la base de datos exitosa')
} catch (error) {
  console.error('Error al conectar a la base de datos:', error)
}

export default connection
