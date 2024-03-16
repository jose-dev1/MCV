/**
 * @swagger
 * /groomerServices:
 *   get:
 *     summary: Obtiene todos los servicios de groomer existentes
 *     tags:
 *       - Groomer Services
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/GroomerService'
 *       404:
 *         description: No hay servicios existentes
 *       500:
 *         description: Error interno del servidor
 *
 * definitions:
 *   GroomerService:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         example: "77b7bfca-dcf9-11ee-992f-42010a400007"
 *         description: ID único del servicio de groomer
 *       fecha_servicio_groomer:
 *         type: string
 *         format: date-time
 *         example: "2024-03-15T08:00:00Z"
 *         description: Fecha del servicio de groomer
 *       contenido_servicio_groomer:
 *         type: string
 *         example: "Baño y corte de pelo"
 *         description: Contenido del servicio de groomer
 *       estado_servicio_groomer:
 *         type: integer
 *         example: 1
 *         description: Estado del servicio de groomer (1 para activo, 0 para inactivo)
 *       anotacion_servicio_groomer:
 *         type: string
 *         example: "Mascota muy amigable"
 *         description: Anotación sobre el servicio de groomer
 *       servicio_finalizado_groomer:
 *         type: boolean
 *         example: true
 *         description: Indica si el servicio de groomer ha sido finalizado
 *       nombre_mascota:
 *         type: string
 *         example: "Buddy"
 *         description: Nombre de la mascota
 *       descripcion_servicio:
 *         type: string
 *         example: "Baño y corte"
 *         description: Descripción del servicio
 *       primer_nombre_cliente:
 *         type: string
 *         example: "Juan"
 *         description: Primer nombre del cliente
 *       primer_apellido_cliente:
 *         type: string
 *         example: "Pérez"
 *         description: Primer apellido del cliente
 */
/**
 * @swagger
 * /groomerServices/{id}:
 *   get:
 *     summary: Obtiene un servicio de groomer por su ID
 *     tags:
 *       - Groomer Services
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único del servicio de groomer
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/GroomerService'
 *       404:
 *         description: No se encontró ningún servicio para el ID proporcionado
 *       500:
 *         description: Error interno del servidor
 *
 * definitions:
 *   GroomerService:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         example: "77b7bfca-dcf9-11ee-992f-42010a400007"
 *         description: ID único del servicio de groomer
 *       primer_nombre_cliente:
 *         type: string
 *         example: "Juan"
 *         description: Primer nombre del cliente
 *       primer_apellido_cliente:
 *         type: string
 *         example: "Pérez"
 *         description: Primer apellido del cliente
 *       fecha_servicio_groomer:
 *         type: string
 *         format: date-time
 *         example: "2024-03-15T08:00:00Z"
 *         description: Fecha del servicio de groomer
 *       contenido_servicio_groomer:
 *         type: string
 *         example: "Baño y corte de pelo"
 *         description: Contenido del servicio de groomer
 *       estado_servicio_groomer:
 *         type: integer
 *         example: 1
 *         description: Estado del servicio de groomer (1 para activo, 0 para inactivo)
 *       anotacion_servicio_groomer:
 *         type: string
 *         example: "Mascota muy amigable"
 *         description: Anotación sobre el servicio de groomer
 *       servicio_finalizado_groomer:
 *         type: boolean
 *         example: true
 *         description: Indica si el servicio de groomer ha sido finalizado
 *       nombre_mascota:
 *         type: string
 *         example: "Buddy"
 *         description: Nombre de la mascota
 *       descripcion_servicio:
 *         type: string
 *         example: "Baño y corte"
 *         description: Descripción del servicio
 *       id_tipo_documento:
 *         type: integer
 *         example: 1
 *         description: ID del tipo de documento del cliente
 *       numero_documento_cliente:
 *         type: string
 *         example: "1234567890"
 *         description: Número de documento del cliente
 */
/**
 * @swagger
 * /groomerServices/create:
 *   post:
 *     summary: Crea un nuevo servicio de groomer
 *     tags:
 *       - Groomer Services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/GroomerServiceInput'
 *     responses:
 *       201:
 *         description: Servicio registrado correctamente
 *       400:
 *         description: Error de solicitud debido a datos duplicados o información ya existente
 *       500:
 *         description: Error interno del servidor
 *
 * definitions:
 *   GroomerServiceInput:
 *     type: object
 *     properties:
 *       notaServicio:
 *         type: string
 *         example: "Baño y corte de pelo"
 *         description: Contenido del servicio de groomer
 *       anotacionServicio:
 *         type: string
 *         example: "Mascota muy amigable"
 *         description: Anotación sobre el servicio de groomer
 *       servicioFinalizado:
 *         type: boolean
 *         example: false
 *         description: Indica si el servicio de groomer ha sido finalizado
 *       idMascota:
 *         type: string
 *         example: "77b7bfca-dcf9-11ee-992f-42010a400007"
 *         description: ID único de la mascota asociada al servicio
 *       idServicio:
 *         type: string
 *         example: "77b7bfca-dcf9-11ee-992f-42010a400007"
 *         description: ID único del tipo de servicio de groomer
 */
/**
 * @swagger
 * /groomerServices/servis/update/{id}:
 *   patch:
 *     summary: Actualiza un servicio de groomer por su ID
 *     tags:
 *       - Groomer Services
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único del servicio de groomer que se desea actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/GroomerServiceUpdateInput'
 *     responses:
 *       201:
 *         description: Servicio actualizado exitosamente
 *       400:
 *         description: Error de solicitud debido a datos duplicados
 *       500:
 *         description: Error interno del servidor
 *
 * definitions:
 *   GroomerServiceUpdateInput:
 *     type: object
 *     properties:
 *       notaServicio:
 *         type: string
 *         example: "Baño y corte de pelo"
 *         description: Nuevo contenido del servicio de groomer
 *       anotacionServicio:
 *         type: string
 *         example: "Mascota muy amigable"
 *         description: Nueva anotación sobre el servicio de groomer
 *       servicioFinalizado:
 *         type: boolean
 *         example: true
 *         description: Indica si el servicio de groomer ha sido finalizado
 */
/**
 * @swagger
 * /groomerServices/delete/{id}:
 *   patch:
 *     summary: Desactiva un servicio de groomer por su ID
 *     tags:
 *       - Groomer Services
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID único del servicio de groomer que se desea desactivar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/DisableGroomerServiceInput'
 *     responses:
 *       200:
 *         description: Servicio desactivado satisfactoriamente
 *       404:
 *         description: El servicio no está registrado
 *       409:
 *         description: El servicio ya ha sido eliminado con anterioridad
 *       500:
 *         description: Error interno del servidor
 *
 * definitions:
 *   DisableGroomerServiceInput:
 *     type: object
 *     properties:
 *       anotacion:
 *         type: string
 *         example: "Servicio cancelado a solicitud del cliente"
 *         description: Anotación sobre la desactivación del servicio de groomer
 */
