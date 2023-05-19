import express from "express";
import {getReservas,postReservas,putReservas,deleteReservas} from "../controllers/reservasControllers.js"

const router = express.Router()

router.get("/", getReservas)  //al pasar asi pasa la funcion entera si pasa como getReservas(), pasa el resultado de la funcion 
router.post("/", postReservas)
router.put("/:id", putReservas)
router.delete("/:id", deleteReservas)

export default router