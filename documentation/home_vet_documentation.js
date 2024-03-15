// Definición de la ruta /inicio-vet
/**
 * @swagger
 * /inicio-vet:
 *   get:
 *     summary: Obtener resumen de inicio del veterinario
 *     tags: [Inicio Veterinario]
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hospitalizaciones_activas:
 *                   type: integer
 *                   example: 3
 *                   description: Número de hospitalizaciones activas
 *                 citas_dia:
 *                   type: integer
 *                   example: 1
 *                   description: Número de citas agendadas para el día
 *                 examenes_pendientes:
 *                   type: integer
 *                   example: 1
 *                   description: Número de exámenes pendientes
 *                 cantidad_mascotas:
 *                   type: integer
 *                   example: 5
 *                   description: Cantidad total de mascotas registradas
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
