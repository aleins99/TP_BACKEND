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
