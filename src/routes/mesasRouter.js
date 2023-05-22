import express from "express";
import {
  getMesas,
  postMesas,
  putMesas,
  deleteMesas,
  mesasDisponibles,
} from "../controllers/mesasControllers.js";

const router = express.Router();

router.get("/", getMesas); //al pasar asi pasa la funcion entera si pasa como getMesas(), pasa el resultado de la funcion
router.post("/", postMesas);
router.put("/:id", putMesas);
router.delete("/:id", deleteMesas);
router.post("/Disponibles", mesasDisponibles);

export default router;
