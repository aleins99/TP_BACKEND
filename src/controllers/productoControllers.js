import {Producto} from "../models/models.js"

export const getProducto = async(req,res) =>{
    const producto = await Producto.findAll()
    res.json(producto)
}

export const postProducto = async(req,res) =>{
    const {nombre_producto,id_categoria,precio_venta} = req.body
    const producto = await Producto.create({nombre_producto,id_categoria,precio_venta})
    res.json(producto)
}
//PUT Producto
export const putProducto = async(req,res) =>{
    const {nombre_producto,id_categoria,precio_venta} = req.body
    const {id} = req.params
    const producto = await Producto.update({nombre_producto,id_categoria,precio_venta}, {where: {id}})
    res.json(producto)
}

//DELETE Producto
export const deleteProducto = async(req,res) =>{
    const {id} = req.params
    const producto = await Producto.destroy({where: {id}})
    res.json(producto)
}
