import { Router } from 'express';
import {DesparasitacionesController} from '../controllers/desparacitacion_controller.js'

export const desparacitacionesRouter = Router();

desparacitacionesRouter.get('/', DesparasitacionesController.getAllDesparasitaciones);
desparacitacionesRouter.get('/:id', DesparasitacionesController.getDesparasitacionById);
desparacitacionesRouter.post('/', DesparasitacionesController.createDesparasitacion);
desparacitacionesRouter.put('/:id', DesparasitacionesController.updateDesparasitacion);
desparacitacionesRouter.put('/delete/:id', DesparasitacionesController.deleteDesparasitacion);

export const desparacitacionTypes = Router();
desparacitacionTypes.get('/', DesparasitacionesController.getTypeDesparacitacion);
