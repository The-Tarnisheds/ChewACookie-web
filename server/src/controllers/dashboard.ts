import { Usuario } from "../models/usuario.";
import { Pedido, DetallePedido, Promo } from "../models/pedido";
import { Producto } from "../models/galleta";

import { Request, Response } from "express";
import HttpStatusCode from "../utils/http-status-code";
import { errorHandler, CustomError } from "../utils/error_handler";
import sequelize from "../config/db";


const getMostSoldsProducts = async (req: Request, res: Response): Promise<any> => {
  try {

    const mostSoldProduct = await DetallePedido.findAll({
        attributes: [
            'id_producto',
            [sequelize.fn('SUM', sequelize.col('cantidad')), 'total_vendido']
        ],
        group: ['id_producto'],
        order: [[sequelize.fn('SUM', sequelize.col('cantidad')), 'DESC']],
        limit: 3,
    })
    let mostSoldsProducts = []
    for(const product of mostSoldProduct) {
      const productDetails = await Producto.findOne({
        where: { id_producto: product.get('id_producto') },
        attributes: ['id_producto', 'nombre']
      });

      mostSoldsProducts.push({product: productDetails, total_vendido: product.get('total_vendido')});

    }
    return res.status(HttpStatusCode.OK).json({
        message: "Productos más vendidos obtenidos correctamente",
        success: true,
        data: mostSoldsProducts,
    });
  } catch (error) {
    errorHandler(error as CustomError | undefined, req, res);

  }
}

const getLeastSoldsProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const leastSoldProduct = await DetallePedido.findAll({
        attributes: [
            'id_producto',
            [sequelize.fn('SUM', sequelize.col('cantidad')), 'total_vendido']
        ],
        group: ['id_producto'],
        order: [[sequelize.fn('SUM', sequelize.col('cantidad')), 'ASC']],
        limit: 3,
    })
    let leastSoldsProducts = []
    for(const product of leastSoldProduct) {
      const productDetails = await Producto.findOne({
        where: { id_producto: product.get('id_producto') },
        attributes: ['id_producto', 'nombre']
      });

      leastSoldsProducts.push({product: productDetails, total_vendido: product.get('total_vendido')});

    }
    return res.status(HttpStatusCode.OK).json({
        message: "Productos menos vendidos obtenidos correctamente",
        success: true,
        data: leastSoldsProducts,
    });

  } catch (error) {
    errorHandler(error as CustomError | undefined, req, res);
    
  }
}

const getTotalSales = async (req: Request, res: Response): Promise<any> => {
    try {

        const totalSales = await DetallePedido.sum('subtotal');
        
        res.status(HttpStatusCode.OK).json({
        message: "Total de ventas obtenido correctamente",
        success: true,
        data: totalSales,
    });

    } catch (error) {
        errorHandler(error as CustomError | undefined, req, res);
        
    }
}

export{
    getMostSoldsProducts,
    getLeastSoldsProducts,
    getTotalSales
}