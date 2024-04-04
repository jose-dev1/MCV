/**
 * @swagger
 * components:
 *   schemas:
 *     Mascota:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador único de la mascota
 *         nombre:
 *           type: string
 *           description: Nombre de la mascota
 *         edad:
 *           type: integer
 *           description: Edad de la mascota en años
 *         especie:
 *           type: string
 *           description: Especie de la mascota
 *       example:
 *         id: abc123
 *         nombre: Max
 *         edad: 3
 *         especie: Perro
 *
 *     HistoriaClinica:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador único de la historia clínica
 *         fecha_registro:
 *           type: string
 *           format: date
 *           description: Fecha de registro de la historia clínica
 *         descripcion:
 *           type: string
 *           description: Descripción de la historia clínica
 *       example:
 *         id: def456
 *         fecha_registro: 2024-04-04
 *         descripcion: Historia clínica de la mascota
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de error
 *
 * /info_mascotas:
 *   get:
 *     summary: Obtener información de todas las mascotas
 *     tags: 
 *       - Mascotas
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mascota'
 *       404:
 *         description: No se encuentran mascotas registradas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /historia_clinica:
 *   get:
 *     summary: Obtener historias clínicas
 *     tags:
 *       - Historias Clínicas
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HistoriaClinica'
 *       404:
 *         description: No se encuentran historias clínicas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /gestionar_mascotas:
 *   get:
 *     summary: Obtener información de una mascota por ID
 *     tags:
 *       - Mascotas
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota a consultar
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mascota'
 *       404:
 *         description: No se encuentra la mascota especificada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Agregar una nueva mascota
 *     tags:
 *       - Mascotas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mascota'
 *     responses:
 *       201:
 *         description: Mascota creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mascota'
 *       400:
 *         description: Solicitud incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /historia_clinica/{mascotaId}:
 *   get:
 *     summary: Obtener historias clínicas de una mascota por ID
 *     tags:
 *       - Historias Clínicas
 *     parameters:
 *       - in: path
 *         name: mascotaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HistoriaClinica'
 *       404:
 *         description: No se encuentran historias clínicas para la mascota especificada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Agregar una nueva historia clínica para una mascota
 *     tags:
 *       - Historias Clínicas
 *     parameters:
 *       - in: path
 *         name: mascotaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistoriaClinica'
 *     responses:
 *       201:
 *         description: Historia clínica creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistoriaClinica'
 *       400:
 *         description: Solicitud incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * @swagger
 * /eliminar_mascota/{id}:
 *   patch:
 *     summary: Eliminar una mascota por ID
 *     tags:
 *       - Mascotas
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota a eliminar
 *     responses:
 *       204:
 *         description: Mascota eliminada exitosamente
 *       404:
 *         description: No se encuentra la mascota especificada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /eliminar_historia_clinica/{historiaId}:
 *   patch:
 *     summary: Eliminar una historia clínica por ID
 *     tags:
 *       - Historias Clínicas
 *     parameters:
 *       - in: path
 *         name: historiaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la historia clínica a eliminar
 *     responses:
 *       204:
 *         description: Historia clínica eliminada exitosamente
 *       404:
 *         description: No se encuentra la historia clínica especificada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
