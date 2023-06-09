import express from "express";
import { getConsumoMesa,getTotalConsumicionMesa,postConsumoClienteCabecera } from "../controllers/consumoClienteControllers.js";
const router = express.Router();
router.get("/mesa/:idMesa", getConsumoMesa);
router.post("/mesa/:idConsumoClienteCabecera/consumo", getTotalConsumicionMesa);
router.post("/", postConsumoClienteCabecera);
export default router;
