import { Router } from "express";
import { createPreference } from "../controllers/pago";

const router = Router();

// Corregimos la definición de la ruta
router.post("/mercadopago/create_preference", (req, res) => {
  createPreference(req, res).catch((error) => {
    console.error("Error in route handler:", error);
    res.status(500).json({ error: "Internal server error" });
  });
});

export default router;
