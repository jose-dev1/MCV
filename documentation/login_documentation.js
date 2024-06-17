/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userCorreo:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               userPassword:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indica si el inicio de sesión fue exitoso
 *                 role:
 *                   type: integer
 *                   example: 2
 *                   description: ID del tipo de usuario
 *                 user:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: string
 *                       description: ID del usuario
 *                     correo_usuario:
 *                       type: string
 *                       description: Correo electrónico del usuario
 *                     link_foto_usuario:
 *                       type: string
 *                       description: Enlace de la foto del usuario
 *                     fecha_creacion_usuario:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de creación del usuario
 *                     estado_usuario:
 *                       type: string
 *                       description: Estado del usuario
 *                     anotacion_usuario:
 *                       type: string
 *                       description: Anotación del usuario
 *                     estado_verificacion_usuario:
 *                       type: string
 *                       description: Estado de verificación del usuario
 *                     id_genero:
 *                       type: string
 *                       description: ID del género del usuario
 *                     id_tipo_usuario:
 *                       type: integer
 *                       description: ID del tipo de usuario
 *                 client:
 *                   type: object
 *                   description: Datos del cliente si el usuario es un cliente
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del cliente
 *                     numero_documento_cliente:
 *                       type: string
 *                       description: Número de documento del cliente
 *                     id_tipo_documento:
 *                       type: string
 *                       description: ID del tipo de documento del cliente
 *                     lugar_expedicion_documento:
 *                       type: string
 *                       description: Lugar de expedición del documento del cliente
 *                     primer_nombre_cliente:
 *                       type: string
 *                       description: Primer nombre del cliente
 *                     segundo_nombre_cliente:
 *                       type: string
 *                       description: Segundo nombre del cliente
 *                     primer_apellido_cliente:
 *                       type: string
 *                       description: Primer apellido del cliente
 *                     segundo_apellido_cliente:
 *                       type: string
 *                       description: Segundo apellido del cliente
 *                     telefono_cliente:
 *                       type: string
 *                       description: Teléfono del cliente
 *                     direccion_cliente:
 *                       type: string
 *                       description: Dirección del cliente
 *                     estado_cliente:
 *                       type: string
 *                       description: Estado del cliente
 *                     anotacion_cliente:
 *                       type: string
 *                       description: Anotación del cliente
 *                     id_usuario:
 *                       type: string
 *                       description: ID del usuario asociado al cliente
 *                 employee:
 *                   type: object
 *                   description: Datos del empleado si el usuario es un empleado
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del empleado
 *                     primer_nombre_empleado:
 *                       type: string
 *                       description: Primer nombre del empleado
 *                     primer_apellido_empleado:
 *                       type: string
 *                       description: Primer apellido del empleado
 *       400:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales inválidas
 *       404:
 *         description: Usuario no registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no registrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */
