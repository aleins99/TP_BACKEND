import express from "express";
import {getClientes,postClientes} from "../controllers/clienteControllers.js"

const router = express.Router()

router.get("/", getClientes)  //al pasar asi pasa la funcion entera si pasa como getClientes(), pasa el resultado de la funcion 
router.post("/", postClientes)

export default router