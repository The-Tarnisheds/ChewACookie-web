import express from "express";
import { getLeastSoldsProducts, getMostSoldsProducts, getTotalSales } from "../controllers/dashboard";

const router = express.Router();

const baseUrl = "/dashboard";
router.get(`${baseUrl}/most-solds`, getMostSoldsProducts);
router.get(`${baseUrl}/least-solds`, getLeastSoldsProducts);
router.get(`${baseUrl}/total-sales`, getTotalSales);

const dashboard = router;
export default dashboard;
