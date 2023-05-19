import {Cliente} from "../models/models.js"

export const getClientes = async(req,res) =>{
    const Clientes = await Cliente.findAll()
    res.json(Clientes)
}

export const postClientes = async(req,res) =>{
    const {cedula,nombre,apellido} = req.body
    const cliente = await Cliente.create({cedula,nombre,apellido})
    res.json(cliente)
}
//PUT Clientes
export const putClientes = async(req,res) =>{
    const {cedula,nombre,apellido} = req.body
    const {id} = req.params
    const cliente = await Cliente.update({cedula,nombre,apellido}, {where: {id}})
    res.json(cliente)
}

//DELETE Clientes
export const deleteClientes = async(req,res) =>{
    const {id} = req.params
    const cliente = await Cliente.destroy({where: {id}})
    res.json(cliente)
}
