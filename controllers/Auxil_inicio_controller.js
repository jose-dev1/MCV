import { HomeAuxilModel } from "../models/auxil_inicio_model.js";

export class AuxiliarInicioController {
    static async getAuxiliarGroo(req, res){
        const response = await HomeAuxilModel.getData()
        if(response instanceof Error){
            res.status(500).json({message: 'Error interno del servidor'})
        }else {
            res.json(response)
        }
    }
}