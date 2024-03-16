import { Router } from "express"
import { RegistroController } from "../controllers/registro_controller.js"
export const registroRoutes = Router()

registroRoutes.post("/", RegistroController.registro)
registroRoutes.get("/genero", RegistroController.genero)
registroRoutes.get("/documento", RegistroController.getDocumento)
//registro cliente
registroRoutes.post("/registro_cliente", RegistroController.registroCliente)
registroRoutes.get("/descarga_certificado", RegistroController.getCertificado)
registroRoutes.get("/descarga_examen", RegistroController.getExamen)
