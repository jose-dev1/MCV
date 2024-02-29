import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import cookieParser from 'cookie-parser'
import { cokiesSecret } from './middlewares/cokies_secret.js'
import 'dotenv/config'
import { loginRoutes } from './routes/login_routes.js'
import { registroRoutes } from './routes/registro_routes.js'
import {
  scheduleRouters,
  rutamascota,
  rutaservicios,
  rutastipousuario,
  rutasdocumentos
} from './routes/schedule_routes.js'
import { adminRoutes } from './routes/admin_routes.js'
import { groomerRoutes } from './routes/groomer_routes.js'
import { appointmentAssistanceRouter } from './routes/appointment_assistance_routes.js'
import { hospitalizacionRouter } from './routes/hospitalizations_routes.js'

const PORT = process.env.PORT ?? 1234

const app = express()
app.use(cookieParser())
app.use(json())
app.use(corsMiddleware())
app.use(cokiesSecret())

app.disable('x-powered-by')
app.use(express.urlencoded({ extended: false }))

app.use('/login', loginRoutes)
app.use('/admin', adminRoutes)
app.use('/agendar', scheduleRouters)
app.use('/mascotas', rutamascota)
app.use('/servicios', rutaservicios)
app.use('/especialistas', rutastipousuario)
app.use('/documentos', rutasdocumentos)
app.use('/registro', registroRoutes)
app.use('/groomer', groomerRoutes)
app.use('/asistencia', appointmentAssistanceRouter)
app.use('/hospitalizaciones', hospitalizacionRouter)

app.listen(PORT, () => {
  console.log(`Aplicacion corriendo en el puerto http://localhost:${PORT}`)
})
