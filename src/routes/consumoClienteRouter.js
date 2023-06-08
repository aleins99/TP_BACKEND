import express from "express";
import { getConsumoMesa } from "../controllers/consumoClienteControllers.js";
const router = express.Router();
router.get("/mesa/:idMesa", getConsumoMesa);
export default router;
