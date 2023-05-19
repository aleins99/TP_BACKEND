import {Mesas} from "../models/models.js"

export const getMesas = async(req,res) =>{
    const mesas = await Mesas.findAll()
    res.json(mesas)
}

export const postMesas = async(req,res) =>{
    const {nombre,idRestaurante,posicionX,posicionY,piso,capacidad} = req.body
    const mesa = await Mesas.create({nombre,idRestaurante,posicionX,posicionY,piso,capacidad})
    res.json(mesa)
}

export const putMesas = async(req,res) =>{
    const {nombre,idRestaurante,posicionX,posicionY,piso,capacidad} = req.body
    const {id} = req.params
    const mesa = await Mesas.update({nombre,idRestaurante,posicionX,posicionY,piso,capacidad}, {where: {id}})
    res.json(mesa)
}

export const deleteMesas = async(req,res) =>{
    const {id} = req.params
    const mesa = await Mesas.destroy({where: {id}})
    res.json(mesa)
}