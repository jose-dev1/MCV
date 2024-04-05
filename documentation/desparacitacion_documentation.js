/**
 * @swagger
 * tags:
 *   name: Desparasitaciones
 *   description: Endpoints para gestionar las desparasitaciones de mascotas
 */

/**
 * @swagger
 * /desparasitacion:
 *   get:
 *     summary: Obtener todas las desparasitaciones
 *     tags: [Desparasitaciones]
 *     responses:
 *       200:
 *         description: Lista de desparasitaciones obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Desparasitacion'
 *       404:
 *         description: No hay desparasitaciones para mostrar
 *       500:
 *         description: Error interno del servidor
 *   post:
 *     summary: Crear una nueva desparasitación
 *     tags: [Desparasitaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewDesparasitacion'
 *     responses:
 *       201:
 *         description: Desparasitación creada con éxito
 *       400:
 *         description: Ya existe una desparasitación registrada
 *       500:
 *         description: Error interno del servidor
 * 
 * /desparasitacion/{id}:
 *   get:
 *     summary: Obtener una desparasitación por su ID
 *     tags: [Desparasitaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID único de la desparasitación
 *     responses:
 *       200:
 *         description: Desparasitación obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Desparasitacion'
 *       404:
 *         description: La desparasitación no fue encontrada
 *       500:
 *         description: Error interno del servidor
 *   put:
 *     summary: Actualizar una desparasitación existente
 *     tags: [Desparasitaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID único de la desparasitación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewDesparasitacion'
 *     responses:
 *       201:
 *         description: Desparasitación actualizada correctamente
 *       404:
 *         description: La desparasitación no fue encontrada
 *       500:
 *         description: Error interno del servidor
 *   patch:
 *     summary: Desactivar una desparasitación existente
 *     tags: [Desparasitaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID único de la desparasitación a desactivar
 *     responses:
 *       201:
 *         description: Desparasitación desactivada correctamente
 *       400:
 *         description: La desparasitación ya ha sido desactivada anteriormente
 *       404:
 *         description: La desparasitación no fue encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Desparasitacion:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *           description: ID único de la desparasitación
 *         medicamento_aplicado:
 *           type: string
 *           example: "Pipeta antiparasitaria"
 *           description: Medicamento aplicado en la desparasitación
 *         fecha_aplicacion_desparacitacion:
 *           type: string
 *           format: date-time
 *           example: "2024-04-04T12:00:00Z"
 *           description: Fecha de aplicación de la desparasitación
 *         estado_desparacitacion:
 *           type: integer
 *           example: 1
 *           description: Estado de la desparasitación (activo o inactivo)
 *   
 *     NewDesparasitacion:
 *       type: object
 *       properties:
 *         medicamento_aplicado:
 *           type: string
 *           example: "Pipeta antiparasitaria"
 *           description: Medicamento aplicado en la desparasitación
 *         fecha_aplicacion_desparacitacion:
 *           type: string
 *           format: date-time
 *           example: "2024-04-04T12:00:00Z"
 *           description: Fecha de aplicación de la desparasitación
 *        
 */
