/**
 * @swagger
 * /envioEmail/contactanos:
 *   post:
 *     summary: Envía un correo de contacto
 *     tags:
 *       - Envío de Correos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/CorreoContacto'
 *     responses:
 *       201:
 *         description: Correo enviado correctamente
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Correo enviado correctamente"
 *       500:
 *         description: Error interno del servidor
 *
 * definitions:
 *   CorreoContacto:
 *     type: object
 *     properties:
 *       nombre:
 *         type: string
 *         example: "Juan"
 *         description: Nombre del remitente del correo
 *       apellido:
 *         type: string
 *         example: "Pérez"
 *         description: Apellido del remitente del correo
 *       email:
 *         type: string
 *         format: email
 *         example: "juanperez@example.com"
 *         description: Dirección de correo electrónico del remitente
 *       celular:
 *         type: string
 *         example: "+1234567890"
 *         description: Número de teléfono del remitente
 *       mensaje:
 *         type: string
 *         example: "Hola, me gustaría saber más sobre sus servicios."
 *         description: Mensaje enviado por el remitente del correo
 */
