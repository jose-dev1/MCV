/**
 * @swagger
 * /home:
 *   get:
 *     summary: Obtener datos de inicio
 *     tags:
 *       - Página de inicio groomer
 *     responses:
 *       200:
 *         description: Datos de inicio obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/HomeData'
 *       500:
 *         description: Error interno del servidor
 *
 * definitions:
 *   HomeData:
 *     type: object
 *     properties:
 *       citas_dia:
 *         type: integer
 *         example: 5
 *         description: Cantidad de citas para el día actual que están pendientes de asistencia
 *       citas_restantes:
 *         type: integer
 *         example: 10
 *         description: Cantidad de citas restantes para el día actual
 *       servicios_pendientes:
 *         type: integer
 *         example: 3
 *         description: Cantidad de servicios de groomer pendientes
 *       servicios_agregados:
 *         type: integer
 *         example: 2
 *         description: Cantidad de servicios de groomer agregados hoy
 */
