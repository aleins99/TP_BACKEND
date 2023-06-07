import express from "express";
import {getCategoria, postCategoria, putCategoria, deleteCategoria} from "../controllers/categoriaControllers.js"
const router = express.Router()

router.get("/", getCategoria)  //al pasar asi pasa la funcion entera si pasa como getClientes(), pasa el resultado de la funcion 
router.post("/", postCategoria)
router.put("/:id", putCategoria)
router.delete("/:id", deleteCategoria)

export default router
