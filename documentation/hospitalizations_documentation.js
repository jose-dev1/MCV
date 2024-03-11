// Llamar a todas las hospitalizaciones registradas
/**
 * @swagger
 * /hospitalizaciones:
 *   get:
 *     summary: Obtener lista de hospitalizaciones
 *     tags: [Hospitalizaciones]
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
 *                     example: "b9b50c67-dfae-11ee-992f-42010a400007"
 *                     description: ID único de la hospitalización
 *                   fecha_hospitalizacion:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-03-11T18:53:22.000Z"
 *                     description: Fecha de hospitalización
 *                   servicio_finalizado_hospitalizacion:
 *                     type: integer
 *                     example: 0
 *                     description: Indicador de si el servicio de hospitalización ha finalizado (0 para no, 1 para sí)
 *                   nombre_mascota:
 *                     type: string
 *                     example: "Tommy"
 *                     description: Nombre de la mascota hospitalizada
 *                   tipo_mascota:
 *                     type: string
 *                     example: "Perro"
 *                     description: Tipo de mascota hospitalizada
 *                   primer_nombre_cliente:
 *                     type: string
 *                     example: "Miguel"
 *                     description: Primer nombre del cliente de la mascota hospitalizada
 *                   primer_apellido_cliente:
 *                     type: string
 *                     example: "Mora"
 *                     description: Primer apellido del cliente de la mascota hospitalizada
 *                   telefono_cliente:
 *                     type: string
 *                     example: "1234567890"
 *                     description: Teléfono del cliente de la mascota hospitalizada
 *                   fecha_salida_hospitalizacion:
 *                     type: string
 *                     format: date-time
 *                     example: null
 *                     description: Fecha de salida de la hospitalización (puede ser null si aún está hospitalizada)
 *       404:
 *         description: No se encuentran hospitalizaciones registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encuentran hospitalizaciones registradas"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en el servidor"
 */
// Llamar a una hospitalizacion registrada por id
/**
 * @swagger
 * /hospitalizaciones/{id}:
 *   get:
 *     summary: Obtener detalles de una hospitalización por ID
 *     tags: [Hospitalizaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único de la hospitalización
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
 *                   example: "b9b50c67-dfae-11ee-992f-42010a400007"
 *                   description: ID único de la hospitalización
 *                 fecha_hospitalizacion:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-03-11T18:53:22.000Z"
 *                   description: Fecha de hospitalización
 *                 servicio_finalizado_hospitalizacion:
 *                   type: integer
 *                   example: 0
 *                   description: Indicador de si el servicio de hospitalización ha finalizado (0 para no, 1 para sí)
 *                 nombre_mascota:
 *                   type: string
 *                   example: "Tommy"
 *                   description: Nombre de la mascota hospitalizada
 *                 telefono_cliente:
 *                   type: string
 *                   example: "1234567890"
 *                   description: Teléfono del cliente de la mascota hospitalizada
 *                 fecha_salida_hospitalizacion:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *                   description: Fecha de salida de la hospitalización (puede ser null si aún está hospitalizada)
 *                 contenido_hospitalizacion:
 *                   type: string
 *                   example: "03-11-2024: se recibe mascota por cuadro renal 03-11-2024: No se supera el cuadro renal se duplica aplicacion de medicamentos"
 *                   description: Contenido de la hospitalización
 *                 descripcion_documento:
 *                   type: string
 *                   example: "Cedula de Ciudadania"
 *                   description: Descripción del documento asociado a la hospitalización
 *                 numeroDocumento:
 *                   type: string
 *                   example: "1234567890"
 *                   description: Número del documento asociado a la hospitalización
 *       404:
 *         description: No se encuentran datos registrados para la historia clinica seleccionada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encuentran datos registrados para la historia clinica seleccionada"
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
// Crear una hospitalizacion
/**
 * @swagger
 * /hospitalizaciones:
 *   post:
 *     summary: Crear una nueva hospitalización
 *     tags: [Hospitalizaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenidoHospitalizacion:
 *                 type: string
 *                 description: Contenido de la hospitalización
 *               idMascota:
 *                 type: string
 *                 description: ID único de la mascota
 *     responses:
 *       201:
 *         description: Hospitalización creada satisfactoriamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hospitalización creada satisfactoriamente"
 *       400:
 *         description: La mascota ya tiene una hospitalización activa en el sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "La mascota ya tiene una hospitalización activa en el sistema"
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
// Actualizar una hospitalizacion
/**
 * @swagger
 * /hospitalizaciones/{id}:
 *   patch:
 *     summary: Actualizar una hospitalización existente
 *     tags: [Hospitalizaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único de la hospitalización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaSalida:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de salida de la hospitalización (opcional)
 *               contenidoHospitalizacion:
 *                 type: string
 *                 description: Contenido de la hospitalización (opcional)
 *               servicioFinalizadoHospitalizacion:
 *                 type: integer
 *                 description: Indicador de si el servicio de hospitalización ha finalizado (opcional)
 *     responses:
 *       200:
 *         description: Hospitalización actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hospitalización actualizada correctamente"
 *       400:
 *         description: La hospitalización ya fue eliminada con anterioridad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "La hospitalización ya fue eliminada con anterioridad"
 *       404:
 *         description: No se encuentra el registro a editar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encuentra el registro a editar"
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
// Cambiar estado hospitalizacion
/**
 * @swagger
 * /hospitalizaciones/delete/{id}:
 *   patch:
 *     summary: Desactivar una hospitalización existente
 *     tags: [Hospitalizaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único de la hospitalización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               anotacion:
 *                 type: string
 *                 description: Anotación asociada a la desactivación de la hospitalización
 *     responses:
 *       201:
 *         description: Hospitalización desactivada satisfactoriamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hospitalización desactivada satisfactoriamente"
 *       400:
 *         description: La historia clínica ya ha sido desactivada con anterioridad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "La historia clínica ya ha sido desactivada con anterioridad"
 *       404:
 *         description: No se encuentra la historia clínica a eliminar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encuentra la historia clínica a eliminar"
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
