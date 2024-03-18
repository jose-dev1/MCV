/**
 * @swagger
 * /carnet/mascotas:
 *   get:
 *     summary: Obtiene todas las mascotas con información relacionada a vacunas
 *     tags:
 *       - Gestión de Vacunas
 *     responses:
 *       200:
 *         description: Mascotas con información de vacunas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/MascotaVacunaInfo'
 *       404:
 *         description: No se encuentran vacunas registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se encuentran vacunas registradas
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error en el servidor
 *
 * definitions:
 *   MascotaVacunaInfo:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         example: "a71efb83-e393-11ee-992f-42010a400007"
 *         description: ID único de la mascota
 *       primer_nombre_cliente:
 *         type: string
 *         example: "Jose"
 *         description: Primer nombre del cliente de la mascota
 *       primer_apellido_cliente:
 *         type: string
 *         example: "Mora"
 *         description: Primer apellido del cliente de la mascota
 *       nombre_mascota:
 *         type: string
 *         example: "Tommy"
 *         description: Nombre de la mascota
 *       tipo_mascota:
 *         type: string
 *         example: "Perro"
 *         description: Tipo de mascota
 *       peso_mascota:
 *         type: number
 *         example: 10
 *         description: Peso de la mascota
 *       tamanno_mascota:
 *         type: number
 *         example: 0
 *         description: Tamaño de la mascota
 *       id_tipo_documento:
 *         type: string
 *         example: "C.C"
 *         description: ID del tipo de documento del cliente
 *       numero_documento_cliente:
 *         type: string
 *         example: "1234567890"
 *         description: Número de documento del cliente
 */
/**
 * @swagger
 * /carnet/ver/{idMascota}:
 *   get:
 *     summary: Obtiene todas las vacunas registradas
 *     tags:
 *       - Gestión de Vacunas
 *     parameters:
 *       - name: idMascota
 *         in: query
 *         description: ID único de la mascota asociada a las vacunas
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Vacunas obtenidas exitosamente
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Vacuna'
 *       404:
 *         description: No se encuentran vacunas registradas
 *       500:
 *         description: Error en el servidor
 *
 * definitions:
 *   Vacuna:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         example: "77b7bfca-dcf9-11ee-992f-42010a400007"
 *         description: ID único de la vacuna
 *       fecha_vacuna_aplicada:
 *         type: string
 *         format: date
 *         example: "2024-03-15"
 *         description: Fecha de aplicación de la vacuna
 *       fecha_vencimiento_vacuna_aplicada:
 *         type: string
 *         format: date
 *         example: "2024-09-15"
 *         description: Fecha de vencimiento de la vacuna aplicada
 *       laboratorio:
 *         type: string
 *         example: "Laboratorio XYZ"
 *         description: Laboratorio de la vacuna
 *       lote_vacuna_aplicada:
 *         type: string
 *         example: "ABC123"
 *         description: Lote de la vacuna aplicada
 *       estado_vacuna_aplicada:
 *         type: integer
 *         example: 1
 *         description: Estado de la vacuna aplicada (1 para presente, 0 para ausente)
 *       nombre_mascota:
 *         type: string
 *         example: "Oliver"
 *         description: Nombre de la mascota asociada a la vacuna
 *       tipo_mascota:
 *         type: string
 *         example: "Gato"
 *         description: Tipo de mascota asociada a la vacuna
 *       nombre_vacuna:
 *         type: string
 *         example: "Rabia"
 *         description: Nombre de la vacuna aplicada
 *       primer_nombre_cliente:
 *         type: string
 *         example: "Miguel"
 *         description: Primer nombre del cliente asociado a la vacuna
 *       primer_apellido_cliente:
 *         type: string
 *         example: "Mora"
 *         description: Primer apellido del cliente asociado a la vacuna
 */

/**
 * @swagger
 * /carnet/tipovacuna/{idMascota}:
 *   get:
 *     summary: Obtiene todos los tipos de vacunas disponibles para esa mascota
 *     tags:
 *       - Gestión de Vacunas
 *     parameters:
 *       - in: query
 *         name: idMascota
 *         schema:
 *           type: string
 *         description: ID único de la mascota para filtrar los tipos de vacunas asociados a ella
 *     responses:
 *       200:
 *         description: Tipos de vacunas obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/TipoVacuna'
 *       404:
 *         description: No se encuentran vacunas para este tipo de mascota
 *       500:
 *         description: Error en el servidor
 *
 * definitions:
 *   TipoVacuna:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         example: "1"
 *         description: ID único del tipo de vacuna
 *       value:
 *         type: string
 *         example: "Rabia"
 *         description: Nombre del tipo de vacuna
 *       id_tipo_mascota:
 *         type: string
 *         example: "1"
 *         description: ID del tipo de mascota asociado al tipo de vacuna
 */
/**
 * @swagger
 * /carnet/busqueda/{id}:
 *   get:
 *     summary: Busca una vacuna por su ID
 *     tags:
 *       - Gestión de Vacunas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la vacuna
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Detalles de la vacuna encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Vacuna'
 *       404:
 *         description: No se encuentra la vacuna con el ID proporcionado
 *       500:
 *         description: Error en el servidor
 *
 * definitions:
 *   Vacuna:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *         description: ID único de la vacuna
 *       fecha_vacuna_aplicada:
 *         type: string
 *         format: date-time
 *         example: "2024-03-15T12:00:00Z"
 *         description: Fecha en la que se aplicó la vacuna
 *       fecha_vencimiento_vacuna_aplicada:
 *         type: string
 *         format: date-time
 *         example: "2024-04-15T12:00:00Z"
 *         description: Fecha de vencimiento de la vacuna
 *       laboratorio:
 *         type: string
 *         example: "Pfizer"
 *         description: Laboratorio que produjo la vacuna
 *       lote_vacuna_aplicada:
 *         type: string
 *         example: "ABC123"
 *         description: Lote de la vacuna aplicada
 *       estado_vacuna_aplicada:
 *         type: integer
 *         example: 1
 *         description: Estado de la vacuna (1 para activa, 0 para inactiva)
 *       nombre_mascota:
 *         type: string
 *         example: "Bobby"
 *         description: Nombre de la mascota a la que se le aplicó la vacuna
 *       tipo_mascota:
 *         type: string
 *         example: "Perro"
 *         description: Tipo de mascota (Perro, Gato, etc.)
 *       nombre_vacuna:
 *         type: string
 *         example: "Rabia"
 *         description: Nombre de la vacuna aplicada
 *       id_tipo_documento:
 *         type: integer
 *         example: 1
 *         description: ID del tipo de documento del propietario de la mascota
 *       numero_documento_cliente:
 *         type: string
 *         example: "1234567890"
 *         description: Número de documento del propietario de la mascota
 */
/**
 * @swagger
 * /carnet/vacunas/create:
 *   post:
 *     summary: Crea una nueva vacuna
 *     tags:
 *       - Gestión de Vacunas
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NuevaVacuna'
 *     responses:
 *       200:
 *         description: Vacuna registrada correctamente
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Vacuna registrada correctamente"
 *       400:
 *         description: Ya existe una vacuna registrada
 *       500:
 *         description: Error del servidor
 *
 * definitions:
 *   NuevaVacuna:
 *     type: object
 *     properties:
 *       fechaVacunaAplicada:
 *         type: string
 *         format: date
 *         example: "2024-03-15"
 *         description: Fecha de aplicación de la vacuna
 *       fechaVencimiento:
 *         type: string
 *         format: date
 *         example: "2024-09-15"
 *         description: Fecha de vencimiento de la vacuna
 *       laboratorio:
 *         type: string
 *         example: "Laboratorio XYZ"
 *         description: Laboratorio que produjo la vacuna
 *       loteVacuna:
 *         type: string
 *         example: "AB123456"
 *         description: Número de lote de la vacuna
 *       idMascota:
 *         type: string
 *         example: "77b7bfca-dcf9-11ee-992f-42010a400007"
 *         description: ID único de la mascota a la que se aplicó la vacuna
 *       idTipoVacuna:
 *         type: string
 *         example: "1"
 *         description: ID único del tipo de vacuna
 */
/**
 * @swagger
 * /carnet/vacunas/update/{id}:
 *   patch:
 *     summary: Actualiza la información de una vacuna existente
 *     tags:
 *       - Gestión de Vacunas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único de la vacuna
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ActualizarVacuna'
 *     responses:
 *       200:
 *         description: Fecha actualizada con éxito
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Fecha actualizada con éxito"
 *       500:
 *         description: Error interno del servidor
 *
 * definitions:
 *   ActualizarVacuna:
 *     type: object
 *     properties:
 *       fechaVacunaAplicada:
 *         type: string
 *         format: date
 *         example: "2024-03-15"
 *         description: Nueva fecha de aplicación de la vacuna
 *       fechaVencimiento:
 *         type: string
 *         format: date
 *         example: "2024-09-15"
 *         description: Nueva fecha de vencimiento de la vacuna
 *       laboratorio:
 *         type: string
 *         example: "Nuevo Laboratorio"
 *         description: Nuevo laboratorio que produjo la vacuna
 *       loteVacuna:
 *         type: string
 *         example: "Nuevo Lote"
 *         description: Nuevo número de lote de la vacuna
 */
/**
 * @swagger
 * /carnet/vacunas/update/{id}:
 *   patch:
 *     summary: Actualiza la información de una vacuna existente
 *     tags:
 *       - Gestión de Vacunas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único de la vacuna
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ActualizarVacuna'
 *     responses:
 *       200:
 *         description: Fecha actualizada con éxito
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Fecha actualizada con éxito"
 *       500:
 *         description: Error interno del servidor
 *
 * definitions:
 *   ActualizarVacuna:
 *     type: object
 *     properties:
 *       fechaVacunaAplicada:
 *         type: string
 *         format: date
 *         example: "2024-03-15"
 *         description: Nueva fecha de aplicación de la vacuna
 */
/**
 * @swagger
 * /carnet/vacunas/delete/{id}:
 *   patch:
 *     summary: Elimina una vacuna existente
 *     tags:
 *       - Gestión de Vacunas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único de la vacuna
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/EliminarVacuna'
 *     responses:
 *       200:
 *         description: Eliminado satisfactoriamente
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Eliminado satisfactoriamente"
 *       404:
 *         description: Vacuna no registrada
 *       409:
 *         description: La vacuna ya ha sido eliminada previamente
 *       500:
 *         description: Error interno del servidor
 *
 * definitions:
 *   EliminarVacuna:
 *     type: object
 *     properties:
 *       anotacion:
 *         type: string
 *         example: "La mascota mostró síntomas leves después de la vacunación"
 *         description: Anotación sobre la eliminación de la vacuna
 */
