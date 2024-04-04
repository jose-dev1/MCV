/**
 * @swagger
 * /inicio_auxil:
 *   get:
 *     summary: Obtener datos de inicio para auxiliares
 *     tags:
 *       - Página de inicio auxiliar
 *     responses:
 *       200:
 *         description: Datos de inicio obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/HomeAuxilData'
 *       500:
 *         description: Error interno del servidor
 *
 * definitions:
 *   HomeAuxilData:
 *     type: object
 *     properties:
 *       total_facturas:
 *         type: integer
 *         example: 10
 *         description: Total de facturas en el sistema
 *       estado_hospitalizacion:
 *         type: string
 *         example: "En curso"
 *         description: Estado de hospitalización
 *       total_hospitalizaciones:
 *         type: integer
 *         example: 3
 *         description: Total de hospitalizaciones por estado
 *       total_desparacitaciones:
 *         type: integer
 *         example: 5
 *         description: Total de desparasitaciones realizadas
 *       asistencia_cita:
 *         type: boolean
 *         example: true
 *         description: Estado de asistencia de la cita
 *       total_citas:
 *         type: integer
 *         example: 15
 *         description: Total de citas por estado de asistencia
 */
