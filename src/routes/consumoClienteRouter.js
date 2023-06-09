import express from "express";
import {
  getConsumoMesa,
  getTotalConsumicionMesa,
  postConsumoClienteCabecera,
  getProductosMesa,
  deleteConsumoClienteCabecera,
  putConsumoClienteCabecera,
  deleteConsumoClienteDetalle,
} from "../controllers/consumoClienteControllers.js";
const router = express.Router();
router.get("/mesa/:idMesa", getConsumoMesa);
router.post("/mesa/:idConsumoClienteCabecera/consumo", getTotalConsumicionMesa);
router.post("/", postConsumoClienteCabecera);
router.get("/mesa/:idMesa/productos", getProductosMesa);
router.put("/:id", putConsumoClienteCabecera);
router.delete("/:id", deleteConsumoClienteCabecera);
router.delete("/detalle/:id", deleteConsumoClienteDetalle);
export default router;
