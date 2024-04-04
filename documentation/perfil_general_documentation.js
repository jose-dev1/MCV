/**
 * @swagger
 * /registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Registro Usuario
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
 *               userGenero:
 *                 type: string
 *                 description: Género del usuario
 *               userRol:
 *                 type: integer
 *                 description: ID del rol del usuario
 *     responses:
 *       201:
 *         description: Registro exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registro exitoso
 *       400:
 *         description: Error en el registro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El correo electrónico ya está en uso
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
 * /registro/genero:
 *   get:
 *     summary: Obtener lista de géneros
 *     tags:
 *       - Informacion general perfil usario/ cliente
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
 *                   id_genero:
 *                     type: integer
 *                     description: ID del género
 *                   nombre_genero:
 *                     type: string
 *                     description: Nombre del género
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
 * /registro/documento:
 *   get:
 *     summary: Obtener lista de tipos de documentos
 *     tags:
 *       - Informacion general perfil usario/ cliente
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
 *                   id_tipo_documento:
 *                     type: integer
 *                     description: ID del tipo de documento
 *                   nombre_tipo_documento:
 *                     type: string
 *                     description: Nombre del tipo de documento
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
 * /registro/verificar_cuenta:
 *   post:
 *     summary: Verificar cuenta de usuario
 *     tags:
 *       - Informacion general perfil usario/ cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo_verificacion:
 *                 type: string
 *                 description: Código de verificación de la cuenta
 *     responses:
 *       200:
 *         description: Cuenta verificada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cuenta verificada exitosamente
 *       400:
 *         description: Error en la verificación de la cuenta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El código de verificación ya ha sido utilizado.
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
 * /registro/actualizar_cliente/{id}:
 *   put:
 *     summary: Actualizar información de un cliente
 *     tags:
 *       - Informacion general perfil usario/ cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contraseña:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del cliente
 *               correo_usuario:
 *                 type: string
 *                 description: Correo electrónico del cliente
 *               numero_documento_cliente:
 *                 type: string
 *                 description: Número de documento del cliente
 *               id_tipo_documento:
 *                 type: integer
 *                 description: ID del tipo de documento del cliente
 *               lugar_expedicion_documento:
 *                 type: string
 *                 description: Lugar de expedición del documento del cliente
 *               primer_nombre_cliente:
 *                 type: string
 *                 description: Primer nombre del cliente
 *               segundo_nombre_cliente:
 *                 type: string
 *                 description: Segundo nombre del cliente
 *               primer_apellido_cliente:
 *                 type: string
 *                 description: Primer apellido del cliente
 *               segundo_apellido_cliente:
 *                 type: string
 *                 description: Segundo apellido del cliente
 *               telefono_cliente:
 *                 type: string
 *                 description: Teléfono del cliente
 *               direccion_cliente:
 *                 type: string
 *                 description: Dirección del cliente
 *               estado_cliente:
 *                 type: integer
 *                 description: Estado del cliente
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cliente actualizado exitosamente
 *       400:
 *         description: Error al actualizar el cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El cliente no pudo ser actualizado
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
 * /registro/registro_cliente:
 *   post:
 *     summary: Registrar un nuevo cliente
 *     tags:
 *       - Informacion general perfil usario/ cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_documento_cliente:
 *                 type: string
 *                 description: Número de documento del cliente
 *               id_tipo_documento:
 *                 type: integer
 *                 description: ID del tipo de documento del cliente
 *               lugar_expedicion_documento:
 *                 type: string
 *                 description: Lugar de expedición del documento del cliente
 *               primer_nombre_cliente:
 *                 type: string
 *                 description: Primer nombre del cliente
 *               segundo_nombre_cliente:
 *                 type: string
 *                 description: Segundo nombre del cliente
 *               primer_apellido_cliente:
 *                 type: string
 *                 description: Primer apellido del cliente
 *               segundo_apellido_cliente:
 *                 type: string
 *                 description: Segundo apellido del cliente
 *               telefono_cliente:
 *                 type: string
 *                 description: Teléfono del cliente
 *               direccion_cliente:
 *                 type: string
 *                 description: Dirección del cliente
 *               estado_cliente:
 *                 type: integer
 *                 description: Estado del cliente
 *               id_usuario:
 *                 type: string
 *                 format: uuid
 *                 description: ID del usuario asociado al cliente
 *     responses:
 *       201:
 *         description: Registro de cliente exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registro de cliente exitoso
 *       400:
 *         description: Error en el registro de cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El cliente no pudo ser registrado
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
 * /registro/desactivar:
 *   post:
 *     summary: Desactivar cuenta de usuario
 *     tags:
 *       - Informacion general perfil usario/ cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo_u:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *     responses:
 *        200:
 *          description: Cuenta desactivada satisfactoriamente
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Eliminado satisfactiriamente
 *        404:
 *          description: Usuario no registrado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Usuario no registrado
 *        409:
 *          description: El usuario ya ha sido eliminado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: El usuario ya ha sido eliminado
 *        500:
 *          description: Error interno del servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servidor
 * /registro/descarga_certificado/{id}:
 *   get:
 *     summary: Descargar certificado
 *     tags:
 *       - Informacion general perfil usario/ cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del certificado
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
 *                 id:
 *                   type: string
 *                   description: ID del certificado
 *                 id_mascota:
 *                   type: string
 *                   description: ID de la mascota asociada al certificado
 *                 informacion_sanitaria_certificado:
 *                   type: string
 *                   description: Información sanitaria del certificado
 *                 informacion_adicional_certificado:
 *                   type: string
 *                   description: Información adicional del certificado
 *                 fecha_certificado:
 *                   type: string
 *                   format: date
 *                   description: Fecha del certificado
 *                 estado_certificado:
 *                   type: integer
 *                   description: Estado del certificado
 *                 anotacion_certificado:
 *                   type: string
 *                   description: Anotación del certificado
 *                 nombre_mascota:
 *                   type: string
 *                   description: Nombre de la mascota asociada al certificado
 *       404:
 *         description: No se encuentran los certificados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se encuentran los certificados
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
 * /registro/descarga_examen/{id}:
 *   get:
 *     summary: Descargar examen
 *     tags:
 *       - Informacion general perfil usario/ cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del examen
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
 *                 id:
 *                   type: string
 *                   description: ID del examen
 *                 fecha_registro_resultados_examen:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de registro de resultados del examen
 *                 fecha_toma_muestra_examen:
 *                   type: string
 *                   format: date
 *                   description: Fecha de toma de muestra del examen
 *                 resultado_examen:
 *                   type: string
 *                   description: Resultado del examen
 *                 link_archivo_examen:
 *                   type: string
 *                   description: Enlace al archivo del examen
 *                 estado_examen:
 *                   type: integer
 *                   description: Estado del examen
 *                 anotacion_examen:
 *                   type: string
 *                   description: Anotación del examen
 *                 registro_completo_examen:
 *                   type: integer
 *                   description: Indicador de registro completo del examen
 *                 nombre_mascota:
 *                   type: string
 *                   description: Nombre de la mascota asociada al examen
 *                 tipo_examen:
 *                   type: string
 *                   description: Tipo de examen
 *       404:
 *         description: No se encuentran los exámenes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se encuentran los exámenes
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
