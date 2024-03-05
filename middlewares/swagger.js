import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'MCV API REST',
      version: '2.0.0'
    },
    servers: [{
      url: 'http://localhost:4321'
    }
    ]
  },
  apis: [`${path.join(__dirname, '..', 'routes', '*.js')}`] // Corregir la ruta de los archivos de rutas
}

const swaggerSpec = swaggerJSDoc(options)

export const swagger = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)) // Corregir la ruta del endpoint de la documentación
}
