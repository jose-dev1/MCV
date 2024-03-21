import { Router } from "express";
import { MascotasController } from "../controllers/mascotas_controller.js";

export const traerMascotas = Router();

traerMascotas.get("/:id", MascotasController.getAllMascotasbyId);
traerMascotas.get("/historial/:id", MascotasController.getAllHistorialMascotasbyId)
traerMascotas.get("/serviciosGroo/:id", MascotasController.getServiciosGroobyId)