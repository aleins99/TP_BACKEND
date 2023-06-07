import {Categoria} from "../models/models.js"

export const getCategoria = async(req,res) =>{
    const categoria = await Categoria.findAll()
    res.json(categoria)
}

export const postCategoria = async(req,res) =>{
    const {nombre} = req.body
    const categoria = await Categoria.create({nombre})
    res.json(categoria)
}
//PUT Categoria
export const putCategoria = async(req,res) =>{
    const {nombre} = req.body
    const {id} = req.params
    const categoria = await Categoria.update({nombre}, {where: {id}})
    res.json(categoria)
}

//DELETE Categoria
export const deleteCategoria = async(req,res) =>{
    const {id} = req.params
    const categoria = await Categoria.destroy({where: {id}})
    res.json(categoria)
}
