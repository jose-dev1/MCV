import { Router } from 'express'
import { RegistroController } from '../controllers/registro_controller.js'
export const registroRoutes = Router()

registroRoutes.post('/', RegistroController.registro)
registroRoutes.get('/genero', RegistroController.genero)
registroRoutes.get('/documento', RegistroController.getDocumento)
registroRoutes.post('/verificar_cuenta', RegistroController.verificarCuenta)
registroRoutes.put('/actualizar_cliente/:id', RegistroController.actualizarCliente)
registroRoutes.patch('/actualizarPassword/:correo', RegistroController.updatePassword)
// registro cliente
registroRoutes.post('/registro_cliente', RegistroController.registroCliente)
registroRoutes.post('/desactivar/', RegistroController.deleteUser)

registroRoutes.post('/recuperar_password', RegistroController.recuperarCuenta)

registroRoutes.get('/descarga_certificado/:id', RegistroController.getCertificado)
registroRoutes.get('/descarga_examen/:id', RegistroController.getExamen)
