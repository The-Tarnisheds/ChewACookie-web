import express from "express";
import { createPedido } from "../controllers/pedido";

const router = express.Router();

const baseUrl = "/pedidos";
router.post(`${baseUrl}/create`, createPedido);

const pedidos = router;
export default pedidos;
