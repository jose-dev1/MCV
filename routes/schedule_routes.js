import { Router } from 'express'
import { ScheduleController } from '../controllers/schedule_controller.js'

export const scheduleRouters = Router()
// Tomar todas las citas por especialsita

/**
 * @swagger
 * components:
 *   schemas:
 *     cita:
 *       type: object
 *       properties:
 *         especialista:
 *           type: string
 *           description: Especialidad a consultar
 *       required:
 *         - especialista
 *       example:
 *         especialista: VET
 */

/**
 * @swagger
 * /agendar/especialista/{especialista}:
 *   get:
 *     summary: Trae todas las citas de una especialidad
 *     tags: [cita]
 *     parameters:
 *       - in: path
 *         name: especialista
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 fecha_cita:
 *                   type: string
 *                   format: date-time
 *                 Hora_cita:
 *                   type: string
 *                   format: time
 *                 primer_nombre_empleado:
 *                   type: string
 *                 primer_apellido_empleado:
 *                   type: string
 *                 primer_nombre_cliente:
 *                   type: string
 *                 primer_apellido_cliente:
 *                   type: string
 *                 nombre_mascota:
 *                   type: string
 *                 descripcion_servicio:
 *                   type: string
 *             example:
 *               id: "fae97814-d67b-11ee-b453-42010a400006"
 *               fecha_cita: "2024-03-01T05:00:00.000Z"
 *               Hora_cita: "17:10:00"
 *               primer_nombre_empleado: "Andres"
 *               primer_apellido_empleado: "Cardenas"
 *               primer_nombre_cliente: "Miguel"
 *               primer_apellido_cliente: "Mora"
 *               nombre_mascota: "Zeus"
 *               descripcion_servicio: "Peluqueria"
 *       '404':
 *          description: No se encuentran citas para el especialista seleccionado
 *       '500':
 *          description: Error interno del servidor
 */
scheduleRouters.get('/especialista/:especialista', ScheduleController.getEspecialista)

/**
 * @swagger
 * /agendar/citas/{id}:
 *   get:
 *     summary: Obtener una cita por su ID
 *     tags:
 *       - cita
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cita a obtener
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 fecha_cita:
 *                   type: string
 *                   format: date-time
 *                 Hora_cita:
 *                   type: string
 *                   format: time
 *                 nombre_empleado:
 *                   type: string
 *                 nombre_mascota:
 *                   type: string
 *                 descripcion_documento:
 *                   type: string
 *                 numero_documento_cliente:
 *                   type: string
 *                 descripcion_servicio:
 *                   type: string
 *                 es:
 *                   type: string
 *                 id_mascota:
 *                   type: string
 *                 id_empleado:
 *                   type: string
 *             example:
 *               id: "fae97814-d67b-11ee-b453-42010a400006"
 *               fecha_cita: "2024-03-01T05:00:00.000Z"
 *               Hora_cita: "17:10:00"
 *               nombre_empleado: "Andres Cardenas"
 *               nombre_mascota: "Zeus"
 *               descripcion_documento: "Cedula de Ciudadania"
 *               numero_documento_cliente: "1234567890"
 *               descripcion_servicio: "Peluqueria"
 *               es: "GRO"
 *               id_mascota: "eb169f13-d061-11ee-872c-42010a400003"
 *               id_empleado: "eb14663a-d061-11ee-872c-42010a400003"
 *       '404':
 *          description: No se encuentran citas con el id seleccionado
 *       '500':
 *          description: Error interno del servidor
 */

scheduleRouters.get('/citas/:id', ScheduleController.getId)

/**
 * @swagger
 * /agendar/{fechaCita}/{idEmpleado}:
 *   get:
 *     summary: Traer todas las citas de un especialista en un día especificado
 *     tags:
 *       - cita
 *     parameters:
 *       - in: path
 *         name: fechaCita
 *         required: true
 *         description: Fecha de las citas a obtener (en formato YYYY-MM-DD)
 *         schema:
 *           type: string
 *           format: date
 *       - in: path
 *         name: idEmpleado
 *         required: true
 *         description: ID del especialista
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   fecha_cita:
 *                     type: string
 *                     format: date-time
 *                   hora_cita:
 *                     type: string
 *                     format: time
 *                   nombre_cliente:
 *                     type: string
 *                   nombre_mascota:
 *                     type: string
 *                   descripcion_servicio:
 *                     type: string
 *                   id_empleado:
 *                     type: string
 *             example:
 *               - id: "1"
 *                 fecha_cita: "2024-03-01T05:00:00.000Z"
 *                 hora_cita: "17:10:00"
 *                 nombre_cliente: "Juan Perez"
 *                 nombre_mascota: "Firulais"
 *                 descripcion_servicio: "Consulta General"
 *                 id_empleado: "eb14663a-d061-11ee-872c-42010a400003"
 *       '404':
 *          description: No se encuentran citas con la fecha seleccionada para el empleado cargado
 *       '500':
 *          description: Error interno del servidor
 */

scheduleRouters.get('/:fechaCita/:idEmpleado', ScheduleController.getFecha)

/**
 * @swagger
 * /agendar:
 *   post:
 *     summary: Registrar una cita
 *     tags:
 *       - cita
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaCita:
 *                 type: string
 *                 format: date
 *               horaCita:
 *                 type: string
 *                 format: time
 *               estadoCita:
 *                 type: string
 *               idEmpleado:
 *                 type: string
 *               idServicio:
 *                 type: string
 *               idMascota:
 *                 type: string
 *               especialista:
 *                 type: string
 *             required:
 *               - fechaCita
 *               - horaCita
 *               - estadoCita
 *               - idEmpleado
 *               - idServicio
 *               - idMascota
 *               - especialista
 *     responses:
 *       '201':
 *         description: Cita registrada correctamente
 *       '400':
 *          description: Ya existe una cita registrada en el espacio seleccionado,
 *                       Ya existe una cita registrada para la mascota con este tipo de especialista,
 *                       La mascota ya tiene una cita registrada en el espacio seleccionado
 *       '500':
 *          description: Error interno del servidor
 */

scheduleRouters.post('/', ScheduleController.create)

/**
 * @swagger
 * /agendar/{id}:
 *   patch:
 *     summary: Actualizar datos de una cita
 *     tags:
 *       - cita
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cita a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaCita:
 *                 type: string
 *                 format: date
 *               horaCita:
 *                 type: string
 *                 format: time
 *               idEmpleado:
 *                 type: string
 *               idMascota:
 *                 type: string
 *             required:
 *               - fechaCita
 *               - horaCita
 *               - idEmpleado
 *               - idMascota
 *     responses:
 *       '200':
 *         description: Cita actualizada correctamente
 *       '400':
 *         description: Ya existe una cita registrada en el espacio seleccionado,
 *                      Ya existe una cita registrada para la mascota en el espacio seleccionado,
 *       '404':
 *         description: No se encontró la cita con el ID especificado
 *       '500':
 *         description: Error interno del servidor
 */

scheduleRouters.patch('/:id', ScheduleController.updateCita)

/**
 * @swagger
 * /desabilitar/{id}:
 *   patch:
 *     summary: Deshabilitar una cita
 *     tags:
 *       - cita
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cita a deshabilitar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               anotacion:
 *                 type: string
 *             required:
 *               - anotacion
 *     responses:
 *       '200':
 *         description: Cita deshabilitada exitosamente
 *       '400':
 *         description: La cita ya ha sido eliminado con anterioridad
 *       '404':
 *         description: Cita no registrada
 *       '500':
 *         description: Error interno del servidor
 */

scheduleRouters.patch('/desabilitar/:id', ScheduleController.desactivarCita)

// constante de prueba
export const rutamascota = Router()
export const rutaservicios = Router()
export const rutastipousuario = Router()
export const rutasdocumentos = Router()
// endpoints de otras rutas
rutamascota.get('/:tipoDocumento/:numeroDocumento', ScheduleController.getMascotas)
rutaservicios.get('/:especialista', ScheduleController.getServicios)
rutastipousuario.get('/:idTipoUsuario', ScheduleController.getEspecialistas)
rutasdocumentos.get('/', ScheduleController.getDocumentos)
