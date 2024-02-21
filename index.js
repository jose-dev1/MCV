import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import cookieParser from 'cookie-parser'
import { cokiesSecret } from './middlewares/cokies_secret.js'
import 'dotenv/config'
import { loginRoutes } from './routes/login_routes.js'
const PORT = process.env.PORT ?? 1234

const app = express()
app.use(cookieParser())
app.use(json())
app.use(corsMiddleware())
app.use(cokiesSecret())

app.disable('x-powered-by')
app.use(express.urlencoded({ extended: false }))
/*
app.use('/', (req, res) => {
  console.log('hola mundo')
})
*/
app.use('/login', loginRoutes)

app.listen(PORT, () => {
  console.log(`Aplicacion corriendo en el puerto http://localhost:${PORT}`)
}
)
