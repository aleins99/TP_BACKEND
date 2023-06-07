import express from "express";
import {getProducto, postProducto, putProducto, deleteProducto} from "../controllers/productoControllers.js"
const router = express.Router()

router.get("/", getProducto)  //al pasar asi pasa la funcion entera si pasa como getClientes(), pasa el resultado de la funcion 
router.post("/", postProducto)
router.put("/:id", putProducto)
router.delete("/:id", deleteProducto)

export default router
