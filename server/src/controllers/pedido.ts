import { Request, Response } from "express";
import HttpStatusCode from "../utils/http-status-code";
import { errorHandler, CustomError } from "../utils/error_handler";
import { Usuario } from "../models/usuario.";
import { Pedido, DetallePedido, Promo } from "../models/pedido";

const createPedido = async (req: Request, res: Response): Promise<any> => {
  const { email, productId, quantity, price} = req.body;
    try {
        if (!email || !productId || !quantity || !price) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                message: "Todos los datos son obligatorios",
                success: false,
            });
        }

        const user = await Usuario.findOne({
            where: { email }
        });
        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                message: "Usuario no encontrado",
                success: false,
            });
        }
        const pedido = await Pedido.create({
            id_usuario: user.get("id_usuario"),
            estado: "pendiente",
            fecha: new Date(),
        })
        const subtotal = price * quantity;
        const detail = await DetallePedido.create({
            id_pedido: pedido.get("id_pedido"),
            id_producto: productId,
            cantidad: quantity,
            subtotal: subtotal,
            estado: "pendiente",
            fecha: new Date(),
        });

        if(subtotal >= 10000){
            const promo = await Promo.findOne({
                where: { id_usuario: user.get("id_usuario") }
            });
            if(!promo){
                const now = new Date();
                const fechaVigencia = new Date(now.setMonth(now.getMonth() + 3));
    
                const newPromo = await Promo.create({
                id_usuario: user.get("id_usuario"),
                fecha_vigencia: fechaVigencia,
                puntos: 10
                });
                console.log("Nueva promoción creada:", newPromo);
            }else{
                const updatedPromo = await (promo as any).update({
                    puntos: (promo as any).get("puntos") + 10,
                });
                console.log("Promoción actualizada:", updatedPromo);
            }
        }
        res.status(HttpStatusCode.CREATED).json({
            message: "Pedido creado exitosamente",
            success: true,
            data: detail
        });
    } catch (error) {
        errorHandler(error as CustomError | undefined, req, res);
    }
}

export { 
    createPedido
};
