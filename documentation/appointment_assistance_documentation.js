// Llamar citas del dia
/**
 * @swagger
 * /asistencia/:
 *   get:
 *     summary: Obtiene las citas del dia actual
 *     tags: [Gestion Asistencia]
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "77b7bfca-dcf9-11ee-992f-42010a400007"
 *                     description: ID único de la cita
 *                   Hora_cita:
 *                     type: string
 *                     example: "22:04:00"
 *                     description: Hora de la cita
 *                   asistencia_cita:
 *                     type: integer
 *                     example: 1
 *                     description: Indicador de asistencia (1 para presente, 0 para ausente)
 *                   descripcion_servicio:
 *                     type: string
 *                     example: "Consulta general"
 *                     description: Descripción del servicio
 *                   primer_nombre_cliente:
 *                     type: string
 *                     example: "Miguel"
 *                     description: Primer nombre del cliente
 *                   primer_apellido_cliente:
 *                     type: string
 *                     example: "Mora"
 *                     description: Primer apellido del cliente
 *                   nombre_mascota:
 *                     type: string
 *                     example: "Oliver"
 *                     description: Nombre de la mascota
 *                   tipo_mascota:
 *                     type: string
 *                     example: "Gato"
 *                     description: Tipo de mascota
 *                   descripcion_usuario:
 *                     type: string
 *                     example: "Veterinario"
 *                     description: Descripción del usuario asociado a la cita
 *       '404':
 *          description: Citas no encontradas
 *       '500':
 *          description: Error interno del servidor
 */

// Marcar inasistencia en una cita
/**
 * @swagger
 * /asistencia/desactivar/{id}:
 *   patch:
 *     summary: Marcar inasistencia en la cita
 *     tags: [Gestion Asistencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único de la cita
 *     responses:
 *       200:
 *         description: Inasistencia confirmada satisfactoriamente
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Inasistencia confirmada satisfactoriamente"
 *       404:
 *         description: Cita no registrada
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Cita no registrada"
 *       409:
 *         description: Ya ha sido confirmada la inasistencia con anterioridad
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Ya ha sido confirmada la inasistencia con anterioridad"
 *       500:
 *         description: Error interno del servidor
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Error interno del servidor"
 */
// Marcar asistencia en una cita
/**
 * @swagger
 * /asistencia/activar/{id}:
 *   patch:
 *     summary: Marcar asistencia en la cita
 *     tags: [Gestion Asistencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único de la cita
 *     responses:
 *       200:
 *         description: Asistencia confirmada satisfactoriamente
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Asistencia confirmada satisfactoriamente"
 *       404:
 *         description: Cita no registrada
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Cita no registrada"
 *       409:
 *         description: Ya ha sido confirmada la Asistencia con anterioridad
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Ya ha sido confirmada la Asistencia con anterioridad"
 *       500:
 *         description: Error interno del servidor
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Error interno del servidor"
 */
