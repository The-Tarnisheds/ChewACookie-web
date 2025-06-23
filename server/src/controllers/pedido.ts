import { Request, Response } from "express";
import HttpStatusCode from "../utils/http-status-code";
import { errorHandler, CustomError } from "../utils/error_handler";
import { Usuario } from "../models/usuario.";
import { Pedido, DetallePedido, Promo } from "../models/pedido";
import sequelize from "../config/db";

const createPedido = async (req: Request, res: Response): Promise<any> => {
  const { email, products } = req.body;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "al menos un producto es obligatorio",
      success: false,
    });
  }

  const transaction = await sequelize.transaction();
  try {
    const user = await Usuario.findOne({ where: { email }, transaction });
    if (user) {

      const pedido = await Pedido.create({
        id_usuario: user.get("id_usuario"),
        estado: "pendiente",
        fecha: new Date(),
      }, { transaction });
  
      let totalPedido = 0;
      const detalles = [];
  
      for (const p of products) {
        const subtotal = p.precio * p.quantity;
        totalPedido += subtotal;
  
        const detail = await DetallePedido.create({
          id_pedido: pedido.get("id_pedido"),
          id_producto: p.id_producto,
          cantidad: p.quantity,
          subtotal: subtotal,
          estado: "pendiente",
          fecha: new Date(),
        }, { transaction });
  
        detalles.push(detail);
      }
  
      if (totalPedido >= 10000) {
        const promo = await Promo.findOne({
          where: { id_usuario: user.get("id_usuario") },
          transaction
        });
  
        if (!promo) {
          const now = new Date();
          const fechaVigencia = new Date(now.setMonth(now.getMonth() + 3));
  
          await Promo.create({
            id_usuario: user.get("id_usuario"),
            fecha_vigencia: fechaVigencia,
            puntos: 10
          }, { transaction });
        } else {
          await (promo as any).update({
            puntos: (promo as any).get("puntos") + 10,
          }, { transaction });
        }
      }
  
      await transaction.commit();
      return res.status(HttpStatusCode.CREATED).json({
        message: "Pedido creado exitosamente",
        success: true,
        data: detalles
      });
    }else{
      const pedido = await Pedido.create({
        id_usuario: null,
        estado: "pendiente",
        fecha: new Date(),
      }, { transaction });
  
      let totalPedido = 0;
      const detalles = [];
  
      for (const p of products) {
        const subtotal = p.precio * p.quantity;
        totalPedido += subtotal;
  
        const detail = await DetallePedido.create({
          id_pedido: pedido.get("id_pedido"),
          id_producto: p.id_producto,
          cantidad: p.quantity,
          subtotal: subtotal,
          estado: "pendiente",
          fecha: new Date(),
        }, { transaction });
  
        detalles.push(detail);
      }
      await transaction.commit();
      return res.status(HttpStatusCode.CREATED).json({
        message: "Pedido creado exitosamente",
        success: true,
        data: detalles
      });
    }

  } catch (error) {
    await transaction.rollback();
    errorHandler(error as CustomError | undefined, req, res);
  }
};

export { 
    createPedido
};
