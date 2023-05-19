import express from "express";
import {getRestaurantes,postRestaurantes,putRestaurantes,deleteRestaurantes} from "../controllers/restaurantesControllers.js"

const router = express.Router()

router.get("/", getRestaurantes)  //al pasar asi pasa la funcion entera si pasa como getRestaurantes(), pasa el resultado de la funcion 
router.post("/", postRestaurantes)
router.put("/:id", putRestaurantes)
router.delete("/:id", deleteRestaurantes)

export default router