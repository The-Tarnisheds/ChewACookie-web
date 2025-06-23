import express from "express";
import { detailSales, getLeastSoldsProducts, getMostSoldsProducts, getTotalSales, totalOrders } from "../controllers/dashboard";

const router = express.Router();

const baseUrl = "/dashboard";
router.get(`${baseUrl}/most-solds`, getMostSoldsProducts);
router.get(`${baseUrl}/least-solds`, getLeastSoldsProducts);
router.get(`${baseUrl}/total-sales`, getTotalSales);
router.get(`${baseUrl}/total-orders`, totalOrders);
router.get(`${baseUrl}/details-sales`, detailSales);

const dashboard = router;
export default dashboard;
