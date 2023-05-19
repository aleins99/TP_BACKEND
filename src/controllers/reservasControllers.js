import {Reservas} from "../models/models.js"

export const getReservas = async(req,res) =>{
    const reservas = await Reservas.findAll()
    res.json(reservas)
}

export const postReservas = async(req,res) =>{
    const {idRestaurante,idMesa,fecha,horario,idCliente,capacidad} = req.body
    const reserva = await Reservas.create({idRestaurante,idMesa,fecha,horario,idCliente,capacidad})
    res.json(reserva)
}

export const putReservas = async(req,res) =>{
    const {idRestaurante,idMesa,fecha,horario,idCliente,capacidad} = req.body
    const {id} = req.params
    const reserva = await Reservas.update({idRestaurante,idMesa,fecha,horario,idCliente,capacidad}, {where: {id}})
    res.json(reserva)
}

export const deleteReservas = async(req,res) =>{
    const {id} = req.params
    const reserva = await Reservas.destroy({where: {id}})
    res.json(reserva)
}