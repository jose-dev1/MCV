/**
 * @swagger
 * /home_perfil/{id}:
 *   get:
 *     summary: Obtener información del perfil de inicio del usuario
 *     tags:
 *       - Informacion del perfil de inicio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_solicitudes_citas:
 *                   type: integer
 *                   description: Total de solicitudes de citas del usuario
 *                 total_mascotas:
 *                   type: integer
 *                   description: Total de mascotas del usuario
 *                 total_examenes_generados:
 *                   type: integer
 *                   description: Total de exámenes generados para las mascotas del usuario
 *                 total_certificados_generados:
 *                   type: integer
 *                   description: Total de certificados generados para las mascotas del usuario
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error en el servidor
 */
