import { NoDataFound, NotFoundUser, DuplicateInfo, InfoAlreadyExisting, AccountAlreadyDisable, OccupiedSpace } from '../squemas/errors_squemas.js'
import { MascotasModel } from '../models/mascotas_model.js'


export class MascotasController {
    static async getAllRazas(req, res) {
        const response = await MascotasModel.getAllRazas()
        if (response instanceof NoDataFound) {
            res.status(404).json({ message: 'No se encuentran documentos' })
        } else if (response instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' })
        } else {
            res.json(response)
        }
    }

    static async getAllGeneros(req, res) {
        const response = await MascotasModel.getAllGeneros()
        if (response instanceof NoDataFound) {
            res.status(404).json({ message: 'No se encuentran documentos' })
        } else if (response instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' })
        } else {
            res.json(response)
        }
    }

    static async getCliente(req, res) {
        const { documento } = req.params
        const response = await MascotasModel.getCliente({ documento })
        if (response instanceof NoDataFound) {
            res.status(404).json({ message: 'No se encuentra el cliente' })
        } else if (response instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' })
        } else {
            res.json(response)
        }
    }

    static async registroMascota(req, res) {
        const {
            nombre_mascota,
            fecha_nacimiento_mascota,
            tipo_sangre_mascota,
            color_mascota,
            raza_mascota,
            peso_mascota,
            tamanno_mascota,
            microchip_mascota,
            foto_mascota,
            estado_mascota,
            anotacion_mascota,
            id_cliente_mascota,
            id_tipo_mascota,
            id_genero_mascota,
        } = req.body
        console.log(req.body)
        const response = await MascotasModel.newMascota({
            nombre_mascota,
            fecha_nacimiento_mascota,
            tipo_sangre_mascota,
            color_mascota,
            raza_mascota,
            peso_mascota,
            tamanno_mascota,
            microchip_mascota,
            foto_mascota,
            estado_mascota,
            anotacion_mascota,
            id_cliente_mascota,
            id_tipo_mascota,
            id_genero_mascota
        });
        if (response instanceof DuplicateInfo) {
            res.status(409).json({ message: 'Ya existe una mascota registrada' })
        } else if (response instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor', error: response })
        } else {
            res.status(201).json({ message: 'Mascota registrada correctamente' })
        }
    }

    static async getAllMascotasbyId(req, res) {
        const { id } = req.params
        const response = await MascotasModel.getAllMascotas({ id })
        if (response instanceof NoDataFound) {
            res.status(404).json({ message: 'No se encuentran mascotas' })
        } else if (response instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' })
        } else {
            res.json(response)
        }
    }

    static async getAllHistorialMascotasbyId(req, res) {
        const { id } = req.params
        const response = await MascotasModel.getAllHistorialMascotas({ id })
        if (response instanceof NoDataFound) {
            res.status(404).json({ message: 'No se encuentran historial de mascotas' })
        } else if (response instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' })
        } else {
            res.json(response[0])
        }
    }

    static async getServiciosByMascotasId(req, res) {
        const { id } = req.params;
        const response = await MascotasModel.getServiciosByMascotasId({ id });

        if (response instanceof NoDataFound) {
            res.status(404).json({ message: 'No se encuentran historial de mascotas' });
        } else if (response instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {

            res.json(response[0]);
        }
    }


    static async getServiciosGroobyId(req, res) {
        const { id } = req.params
        const response = await MascotasModel.getServiciosGroobyId({ id })
        if (response instanceof NoDataFound) {
            res.status(404).json({ message: 'No se encuentran historial de mascotas' })
        } else if (response instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' })
        } else {
            res.json(response)
        }
    }

    static async getAllMascotas(req, res) {
        const response = await MascotasModel.getAllMascota()
        if (response instanceof NoDataFound) {
            res.status(404).json({ message: 'No se encuentran historial de mascotas' })
        } else if (response instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' })
        } else {
            res.json(response)
        }
    }

}