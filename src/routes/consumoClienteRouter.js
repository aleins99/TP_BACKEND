import express from "express";
import { getConsumoMesa,getTotalConsumicionMesa } from "../controllers/consumoClienteControllers.js";
const router = express.Router();
router.get("/mesa/:idMesa", getConsumoMesa);
router.post("/mesa/:idConsumoClienteCabecera/consumo", getTotalConsumicionMesa);
export default router;
