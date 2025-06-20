import { Producto } from "../models/galleta";
import { Request, Response } from "express";
import HttpStatusCode from "../utils/http-status-code";
import { errorHandler, CustomError } from "../utils/error_handler";

const getProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await Producto.findAll();
    if (!products) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: "No se encontro el producto.",
        success: false,
      });
    }

    res.status(HttpStatusCode.OK).json({
      message: "Fetched products successfully.",
      results: products,
    });
  } catch (error) {
    errorHandler(error as CustomError | undefined, req, res);
  }
};

export { getProducts };
