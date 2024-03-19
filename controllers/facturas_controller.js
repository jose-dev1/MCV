import { NoDataFound, NotFoundUser, DuplicateInfo, InfoAlreadyExisting, AccountAlreadyDisable, OccupiedSpace } from '../squemas/errors_squemas.js'
import { FacturaModel } from '../models/factura_model.js'


export class FacturasController {
    static async getServicios(req, res) {
        const facturas = await FacturaModel.getAllServicios()
        if (facturas instanceof NoDataFound) {
            res.status(404).json({ message: 'No se encuentran facturas' })
        } else if (facturas instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' })
        } else {
            res.json(facturas)
        }
    }

    static async getFactura(req, res) {
        const facturas = await FacturaModel.getFacturas()
        if (facturas instanceof NoDataFound) {
            res.status(404).json({ message: 'No se encuentran facturas' })
        } else if (facturas instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' })
        } else {
            res.json(facturas)
        }
    }

    static async registrarFactura(req, res) {
        const datoToSend = req.body
        const response = await FacturaModel.postFactura(datoToSend)
        const response1 = await FacturaModel.postHasFactura(datoToSend)
        if (response instanceof NoDataFound) {
            res.status(404).json({ message: 'No se encuentran facturas' })
        } else if (response instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' })
        } else {
            res.json({ message: 'Factura registrada correctamente' })
        }

    }


    static async getFacturaById(req, res) {
        const { id } = req.params
        const facturas = await FacturaModel.getFacturasbyId({ id })
        if (facturas instanceof NoDataFound) {
            res.status(404).json({ message: 'No se encuentran facturas' })
        } else if (facturas instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' })
        } else {
            res.json(facturas)
        }
    }

}