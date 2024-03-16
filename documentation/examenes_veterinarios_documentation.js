// Definición de la ruta /examenesVeterinario/
/**
 * @swagger
 * /examenesVeterinario/:
 *   get:
 *     summary: Mostrar todos los exámenes veterinarios activos
 *     tags: [ExamenesVeterinario]
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
 *                     description: ID único del examen veterinario
 *                   fecha_registro_resultados_examen:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de registro de los resultados del examen veterinario
 *                   fecha_toma_muestra_examen:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de toma de la muestra del examen veterinario
 *                   resultado_examen:
 *                     type: string
 *                     description: Resultado del examen veterinario
 *                   link_archivo_examen:
 *                     type: string
 *                     description: Enlace al archivo del examen veterinario
 *                   estado_examen:
 *                     type: integer
 *                     description: Estado del examen veterinario (1 para activo, 0 para inactivo)
 *                   anotacion_examen:
 *                     type: string
 *                     description: Anotación del examen veterinario
 *                   nombre_mascota:
 *                     type: string
 *                     description: Nombre de la mascota asociada al examen veterinario
 *                   tipo_examen:
 *                     type: string
 *                     description: Tipo de examen veterinario realizado
 *                   primer_nombre_cliente:
 *                     type: string
 *                     description: Primer nombre del cliente de la mascota asociada al examen veterinario
 *                   primer_apellido_cliente:
 *                     type: string
 *                     description: Primer apellido del cliente de la mascota asociada al examen veterinario
 *                   numero_documento_cliente:
 *                     type: string
 *                     description: Número de documento del cliente de la mascota asociada al examen veterinario
 *                   registro_completo_examen:
 *                     type: integer
 *                     description: Indicador de si el registro del examen veterinario está completo (1 para sí, 0 para no)
 *       404:
 *         description: No hay exámenes para mostrar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hay exámenes para mostrar"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
*/

// Definición de la ruta /examenesVeterinario/:id
/**
 * @swagger
 * /examenesVeterinario/{id}:
 *   get:
 *     summary: Obtener detalles de un examen veterinario por ID
 *     tags: [ExamenesVeterinario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único del examen veterinario a consultar
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID único del examen veterinario
 *                 fecha_registro_resultados_examen:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de registro de los resultados del examen veterinario
 *                 fecha_toma_muestra_examen:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de toma de la muestra del examen veterinario
 *                 resultado_examen:
 *                   type: string
 *                   description: Resultado del examen veterinario
 *                 link_archivo_examen:
 *                   type: string
 *                   description: Enlace al archivo del examen veterinario
 *                 estado_examen:
 *                   type: integer
 *                   description: Estado del examen veterinario (1 para activo, 0 para inactivo)
 *                 anotacion_examen:
 *                   type: string
 *                   description: Anotación del examen veterinario
 *                 nombre_mascota:
 *                   type: string
 *                   description: Nombre de la mascota asociada al examen veterinario
 *                 tipo_examen:
 *                   type: string
 *                   description: Tipo de examen veterinario realizado
 *                 primer_nombre_cliente:
 *                   type: string
 *                   description: Primer nombre del cliente de la mascota asociada al examen veterinario
 *                 primer_apellido_cliente:
 *                   type: string
 *                   description: Primer apellido del cliente de la mascota asociada al examen veterinario
 *                 numero_documento_cliente:
 *                   type: string
 *                   description: Número de documento del cliente de la mascota asociada al examen veterinario
 *                 registro_completo_examen:
 *                   type: integer
 *                   description: Indicador de si el registro del examen veterinario está completo (1 para sí, 0 para no)
 *                 descripcion_documento:
 *                   type: string
 *                   description: Descripción del tipo de documento asociado al cliente
 *       404:
 *         description: No hay examenes disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hay examenes disponibles"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
 */

// Definición de la ruta /examenesVeterinario/
/**
 * @swagger
 * /examenesVeterinario/:
 *   post:
 *     summary: Crear un nuevo examen veterinario
 *     tags: [ExamenesVeterinario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idMascota:
 *                 type: string
 *                 description: ID único de la mascota asociada al examen
 *               idTipoExamen:
 *                 type: string
 *                 description: ID único del tipo de examen
 *     responses:
 *       201:
 *         description: Examen creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Examen creado con exito"
 *       400:
 *         description: Ya existe un examen registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ya existe un examen registrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
 */

// Definición de la ruta /examenesVeterinario/delete/:id
/**
 * @swagger
 * /examenesVeterinario/delete/{id}:
 *   patch:
 *     summary: Desactivar un examen veterinario por ID
 *     tags: [ExamenesVeterinario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único del examen veterinario a desactivar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               anotacion:
 *                 type: string
 *                 description: Anotación para desactivar el examen veterinario
 *     responses:
 *       201:
 *         description: Examen desactivado satisfactoriamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Examen desactivado satisfactoriamente"
 *       400:
 *         description: El examen ya ha sido desactivado con anterioridad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El examen ya ha sido desactivado con anterioridad"
 *       500:
 *         description: Error interno en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno en el servidor"
 */

// Definición de la ruta /examenesVeterinario/:id
/**
 * @swagger
 * /examenesVeterinario/{id}:
 *   patch:
 *     summary: Actualizar datos de un examen veterinario por ID
 *     tags: [ExamenesVeterinario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único del examen veterinario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaRegistroResultadosExamen:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de registro de resultados del examen
 *               resultadoExamen:
 *                 type: string
 *                 description: Resultado del examen
 *               linkArchivoExamen:
 *                 type: string
 *                 description: Enlace al archivo del examen
 *               registroCompletoExamen:
 *                 type: integer
 *                 description: Indicador de si el registro del examen está completo (0 para no, 1 para sí)
 *     responses:
 *       201:
 *         description: Examen actualizado satisfactoriamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Examen actualizado satisfactoriamente"
 *       400:
 *         description: El examen ya ha sido desactivado con anterioridad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El examen ya ha sido desactivado con anterioridad"
 *       500:
 *         description: Error interno en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno en el servidor"
 */
