import { Router } from "express";
import { RegistroController } from "../controllers/registro_controller.js";
export const registroRoutes = Router();

registroRoutes.post("/", RegistroController.registro);
registroRoutes.get("/genero", RegistroController.genero);
