import { AccountAlreadyDisable, DuplicateInfo, NoDataFound } from '../squemas/errors_squemas.js';
import { DesparasitacionesModel } from '../models/desparacitacion_model.js'

export class DesparasitacionesController {
  static async getAllDesparasitaciones(req, res) {
    const response = await DesparasitacionesModel.getAllDesparasitaciones();
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No hay desparasitaciones para mostrar' });
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    } else {
      res.json(response);
    }
  }

  static async getDesparasitacionById(req, res) {
    const { id } = req.params;
    const response = await DesparasitacionesModel.getDesparasitacionById({ id });
    if (!response) {
      res.status(404).json({ message: 'No se encuentra la desparasitación solicitada' });
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    } else {
      res.json(response);
    }
  }

  static async createDesparasitacion(req, res) {
    const data = req.body;
    const response = await DesparasitacionesModel.createDesparasitacion(data);
    if (response instanceof DuplicateInfo) {
      res.status(400).json({ message: 'Ya existe una desparasitación registrada' });
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    } else {
      res.status(201).json({ message: 'Desparasitación creada con éxito' });
    }
  }

  static async updateDesparasitacion(req, res) {
    const { id } = req.params;
    const data = req.body;
    const response = await DesparasitacionesModel.updateDesparasitacion({ id, input: data });
    if (!response) {
      res.status(404).json({ message: 'No se encuentra el registro a editar' });
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno en el servidor' });
    } else {
      res.status(201).json({ message: 'Desparasitación actualizada correctamente' });
    }
  }

  static async deleteDesparasitacion(req, res) {
    const { id } = req.params;
    const data = req.body;
    const response = await DesparasitacionesModel.deleteDesparasitacion({ id, input: data });
    if (response instanceof AccountAlreadyDisable) {
      res.status(400).json({ message: 'La desparasitación ya ha sido desactivada anteriormente' });
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno en el servidor' });
    } else {
      res.status(201).json({ message: 'Desparasitación desactivada satisfactoriamente' });
    }
  }

  static async getTypeDesparacitacion(req, res){
    const response = await DesparasitacionesModel.getDesparacitacionTypes()
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentra los tipos de desparacitacion' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno en el servidor' })
    } else {
      res.json(response)
    }

  }
}
