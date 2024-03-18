import { Router } from 'express';
import { DesparasitacionesController } from '../controllers/desparacitacion_controller.js'

export const desparacitacionesRouter = Router();

desparacitacionesRouter.get('/', DesparasitacionesController.getAllDesparasitaciones);
desparacitacionesRouter.get('/:id', DesparasitacionesController.getDesparasitacionById);
desparacitacionesRouter.post('/crear_desparasitacion', DesparasitacionesController.createDesparasitacion);
desparacitacionesRouter.put('/actualizar_desparasitacion/:id', DesparasitacionesController.updateDesparasitacion);
desparacitacionesRouter.patch('/delete/:id', DesparasitacionesController.deleteDesparasitacion);

export const desparacitacionTypes = Router();
desparacitacionTypes.get('/', DesparasitacionesController.getTypeDesparacitacion);
