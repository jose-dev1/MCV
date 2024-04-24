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
import { adminRoutes, genreTypes, userTypeRouter } from './routes/admin_routes.js'
import { groomerRoutes } from './routes/groomer_routes.js'
import { appointmentAssistanceRouter } from './routes/appointment_assistance_routes.js'
import { hospitalizacionRouter } from './routes/hospitalizations_routes.js'
import { vacunasRouter } from './routes/vacunas_routes.js'
import { swagger } from './middlewares/swagger.js'
import { examenesVeteriarioRouter, examnTypes, infoClienteMascotaRouter } from './routes/examenes_veterinarios_routes.js'
import { homeVetRoutes } from './routes/home_vet_routes.js'
import { envioEmailRouter } from './routes/sendEmail_routes.js'
import { homeGroRoutes } from './routes/home_gro_routes.js'
import { registroMascotas } from './routes/registro_mascotas.js'
import { facturasRouter } from './routes/facturaRoutes.js'
import fileUpload from 'express-fileupload'
import { desparacitacionesRouter, desparacitacionTypes } from './routes/desperacitacion_router.js'
import { agendaRouter } from './routes/agenda_routes.js'
import { certificateRouter } from './routes/certificate_routes.js'
import { historiaClinica, traerMascotas, gestionMascota } from './routes/traer_mascota.js'
import { AuxilInicioRouter } from './routes/auxil_inicio_routes.js'
import { uploadRouter } from './routes/upload_files.js'
import { HomePerfilRoutes } from './routes/perfil_home_routes.js'
import { Clientes } from './routes/get_cliente_routes.js'
const PORT = process.env.PORT ?? 1234

const app = express()
app.use(cookieParser())
app.use(json())
app.use(corsMiddleware())
app.use(cokiesSecret())
app.use(fileUpload())
// midewlere swagger

app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }))

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
app.use('/userTypes', userTypeRouter)
app.use('/genreTypes', genreTypes)
app.use('/carnet', vacunasRouter)
app.use('/examenesVeterinario', examenesVeteriarioRouter)
app.use('/examTypes', examnTypes)
app.use('/inicio-vet', homeVetRoutes)
app.use('/envio-email', envioEmailRouter)
app.use('/inicio-gro', homeGroRoutes)
app.use('/registro-mascota', registroMascotas)
app.use('/factura', facturasRouter)
app.use('/desparasitacion', desparacitacionesRouter)
app.use('/despaTypes', desparacitacionTypes)
app.use('/agenda_groomer', agendaRouter)
app.use('/certificados', certificateRouter)
app.use('/info_mascotas', traerMascotas)
app.use('/infoClienteMascota', infoClienteMascotaRouter)
app.use('/historia_clinica', historiaClinica)
app.use('/gestionar_mascotas', gestionMascota)
app.use('/inicio_auxil', AuxilInicioRouter)
app.use('/files', uploadRouter)
app.use('/home_perfil', HomePerfilRoutes)
app.use('/get_clientes', Clientes)

swagger(app, PORT)

app.listen(PORT, () => {
  console.log(`Aplicacion corriendo en el puerto http://localhost:${PORT}`)
})
