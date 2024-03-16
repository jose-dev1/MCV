// Definición de la ruta /admin/
/**
 * @swagger
 * /admin/:
 *   get:
 *     summary: Obtener todos los empleados registrados en la plataforma
 *     tags: [Admin]
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
 *                   id:
 *                     type: string
 *                     example: "53c91c36-e0ad-11ee-992f-42010a400007"
 *                     description: ID único del empleado
 *                   numero_documento_empleado:
 *                     type: string
 *                     example: "1234567890"
 *                     description: Número de documento del empleado
 *                   id_tipo_documento:
 *                     type: string
 *                     example: "C.C"
 *                     description: ID del tipo de documento del empleado
 *                   primer_nombre_empleado:
 *                     type: string
 *                     example: "Edwin"
 *                     description: Primer nombre del empleado
 *                   segundo_nombre_empleado:
 *                     type: string
 *                     example: null
 *                     description: Segundo nombre del empleado (puede ser null)
 *                   primer_apellido_empleado:
 *                     type: string
 *                     example: "Vaca"
 *                     description: Primer apellido del empleado
 *                   segundo_apellido_empleado:
 *                     type: string
 *                     example: null
 *                     description: Segundo apellido del empleado (puede ser null)
 *                   correo_usuario:
 *                     type: string
 *                     example: "vet@hotmail.com"
 *                     description: Correo electrónico del usuario
 *                   password_usuario:
 *                     type: string
 *                     example: "$2b$10$MueiR7xe7Y3xepDO9qI6meu95QGtUJPsdgwbrcWB8o0C22AO6VAzm"
 *                     description: Contraseña del usuario (hash)
 *                   estado_usuario:
 *                     type: integer
 *                     example: 1
 *                     description: Estado del usuario (1 activo, 0 inactivo)
 *                   descripcion_usuario:
 *                     type: string
 *                     example: "Veterinario"
 *                     description: Descripción del rol del empleado
 *       404:
 *         description: Usuario no registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no registrado"
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

// Definición de la ruta /admin/:id
/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Obtener datos de un empleado por ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único del empleado
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
 *                   example: "53c91c36-e0ad-11ee-992f-42010a400007"
 *                   description: ID único del empleado
 *                 numeroDocumentoEmpleado:
 *                   type: string
 *                   example: "1234567890"
 *                   description: Número de documento del empleado
 *                 idTipoDocumento:
 *                   type: string
 *                   example: "C.C"
 *                   description: ID del tipo de documento del empleado
 *                 primerNombreEmpleado:
 *                   type: string
 *                   example: "Edwin"
 *                   description: Primer nombre del empleado
 *                 segundoNombreEmpleado:
 *                   type: string
 *                   example: null
 *                   description: Segundo nombre del empleado (puede ser null)
 */

// Definición de la ruta /admin/
/**
 * @swagger
 * /admin/:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correoUsuario:
 *                 type: string
 *                 description: Correo electrónico del nuevo empleado
 *               passwordUsuario:
 *                 type: string
 *                 description: Contraseña del nuevo empleado
 *               estadoUsuario:
 *                 type: integer
 *                 description: Estado del nuevo empleado
 *               estadoVerificacionUsuario:
 *                 type: integer
 *                 description: Estado de verificación del nuevo empleado
 *               idGenero:
 *                 type: string
 *                 description: ID del género del nuevo empleado
 *               idTipoUsuario:
 *                 type: integer
 *                 description: ID del tipo de usuario del nuevo empleado
 *               numeroDocumentoEmpleado:
 *                 type: string
 *                 description: Número de documento del nuevo empleado
 *               idTipoDocumento:
 *                 type: string
 *                 description: ID del tipo de documento del nuevo empleado
 *               primerNombreEmpleado:
 *                 type: string
 *                 description: Primer nombre del nuevo empleado
 *               segundoNombreEmpleado:
 *                 type: string
 *                 description: Segundo nombre del nuevo empleado
 *               primerApellidoEmpleado:
 *                 type: string
 *                 description: Primer apellido del nuevo empleado
 *               segundoApellidoEmpleado:
 *                 type: string
 *                 description: Segundo apellido del nuevo empleado
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empleado creado exitosamente"
 *       400:
 *         description: El usuario o empleado ya está registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El usuario o empleado ya está registrado"
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

// Definición de la ruta /admin/desabilitar/:id
/**
 * @swagger
 * /admin/desabilitar/{id}:
 *   patch:
 *     summary: Deshabilitar un empleado por ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único del empleado a deshabilitar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               anotacion:
 *                 type: string
 *                 description: Anotación sobre la deshabilitación del empleado
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empleado desactivado satisfactoriamente"
 *       404:
 *         description: Empleado no registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Empleado no registrado"
 *       409:
 *         description: El Empleado ya ha sido eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El Empleado ya ha sido eliminado"
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

// Definición de la ruta /asistencia/actualizar/:id
/**
 * @swagger
 * /admin/actualizar/{id}:
 *   patch:
 *     summary: Actualizar los datos de un empleado por ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único del empleado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correoUsuario:
 *                 type: string
 *                 description: Nuevo correo electrónico del empleado
 *               idGenero:
 *                 type: string
 *                 description: Nuevo ID del género del empleado
 *               numeroDocumentoEmpleado:
 *                 type: string
 *                 description: Nuevo número de documento del empleado
 *               idTipoDocumento:
 *                 type: string
 *                 description: Nuevo ID del tipo de documento del empleado
 *               primerNombreEmpleado:
 *                 type: string
 *                 description: Nuevo primer nombre del empleado
 *               segundoNombreEmpleado:
 *                 type: string
 *                 description: Nuevo segundo nombre del empleado
 *               primerApellidoEmpleado:
 *                 type: string
 *                 description: Nuevo primer apellido del empleado
 *               segundoApellidoEmpleado:
 *                 type: string
 *                 description: Nuevo segundo apellido del empleado
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Actualizado con éxito"
 *       404:
 *         description: El número de documento con el tipo de documento ya existe dentro del sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El número de documento con el tipo de documento ya existe dentro del sistema"
 *       409:
 *         description: El correo ya existe dentro del sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El correo ya existe dentro del sistema"
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
