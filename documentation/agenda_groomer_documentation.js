// @swagger
// definitions:
//   Cita:
//     type: "object"
//     properties:
//       id:
//         type: "string"
//         example: "53c91c36-e0ad-11ee-992f-42010a400007"
//         description: "ID único de la cita"
//       fecha_cita:
//         type: "string"
//         example: "2024-04-04"
//         description: "Fecha de la cita"
//       Hora_cita:
//         type: "string"
//         example: "10:00"
//         description: "Hora de la cita"
//       asistencia_cita:
//         type: "boolean"
//         example: true
//         description: "Estado de asistencia a la cita"
//       estado_cita:
//         type: "integer"
//         example: 1
//         description: "Estado de la cita (1 activa, 0 inactiva)"
//       id_empleado:
//         type: "string"
//         example: "53c91c36-e0ad-11ee-992f-42010a400007"
//         description: "ID único del empleado asignado a la cita"
//       descripcion_servicio:
//         type: "string"
//         example: "Baño y corte"
//         description: "Descripción del servicio de la cita"
//       nombre_mascota:
//         type: "string"
//         example: "Bobby"
//         description: "Nombre de la mascota"
//       primer_nombre_cliente:
//         type: "string"
//         example: "Juan"
//         description: "Primer nombre del cliente"
//       primer_apellido_cliente:
//         type: "string"
//         example: "Pérez"
//         description: "Primer apellido del cliente"
//       anotacion_cita:
//         type: "string"
//         example: "Cliente canceló la cita"
//         description: "Anotación sobre la cita"

// @swagger
// definitions:
//   UpdateCitaBody:
//     type: "object"
//     properties:
//       anotacion:
//         type: "string"
//         example: "Cliente canceló la cita"
//         description: "Anotación sobre la cita a actualizar"

// @swagger
// definitions:
//   Message:
//     type: "object"
//     properties:
//       message:
//         type: "string"
//         example: "Cita actualizada exitosamente"
//         description: "Mensaje de éxito o confirmación"

// @swagger
// definitions:
//   Error:
//     type: "object"
//     properties:
//       message:
//         type: "string"
//         example: "Error interno del servidor"
//         description: "Mensaje de error"

// @swagger
// tags:
//   - name: "Agenda"
//     description: "Operaciones relacionadas con la agenda de citas"

// @swagger
// /agenda_groomer:
//   get:
//     summary: "Obtener todas las citas de la agenda"
//     tags:
//       - "Agenda"
//     parameters:
//       - in: "query"
//         name: "id_usuario"
//         description: "ID único del usuario para filtrar las citas"
//         required: true
//         type: "string"
//     responses:
//       200:
//         description: "Operación exitosa"
//         schema:
//           type: "array"
//           items:
//             $ref: "#/definitions/Cita"
//       500:
//         description: "Error interno del servidor"
//         schema:
//           $ref: "#/definitions/Error"

// @swagger
// /agenda_groomer/{id}:
//   put:
//     summary: "Actualizar una cita de la agenda"
//     tags:
//       - "Agenda"
//     parameters:
//       - in: "path"
//         name: "id"
//         description: "ID único de la cita a actualizar"
//         required: true
//         type: "string"
//       - in: "body"
//         name: "body"
//         description: "Datos de la cita a actualizar"
//         required: true
//         schema:
//           $ref: "#/definitions/UpdateCitaBody"
//     responses:
//       200:
//         description: "Cita actualizada exitosamente"
//         schema:
//           $ref: "#/definitions/Message"
//       404:
//         description: "Cita no encontrada o ya eliminada"
//         schema:
//           $ref: "#/definitions/Error"
//       500:
//         description: "Error interno del servidor"
//         schema:
//           $ref: "#/definitions/Error"
