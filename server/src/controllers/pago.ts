import { Request, Response } from "express";
import { preferences } from "../config/mercadoPago";

export const createPreference = async (req: Request, res: Response) => {
  try {
    const items = req.body.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Debe proporcionar items válidos" });
    }

    const preference = {
      items: items.map((item) => ({
        id: item.id_producto,
        title: item.nombre,
        unit_price: Number(item.precio),
        quantity: item.quantity,
        currency_id: "CLP",
        description: item.descripcion || "",
        picture_url: item.imagen || undefined,
      })),
      back_urls: {
        success: `${process.env.FRONTEND_URL}pago-exitoso`,
        failure: `${process.env.FRONTEND_URL}pago-fallido`,
        pending: `${process.env.FRONTEND_URL}pago-pendiente`,
      },
      auto_return: "approved",
      
    };
    if (!preference.back_urls?.success) {
      throw new Error("Falta back_urls.success, y es obligatorio para auto_return");
    }

    console.log("🔎 URLs:", {
  success: `${process.env.FRONTEND_URL}pago-exitoso`,
  failure: `${process.env.FRONTEND_URL}pago-fallido`,
  pending: `${process.env.FRONTEND_URL}pago-pendiente`,
});
    const response = await preferences.create({ body: preference });
    return res.status(200).json({ init_point: response.init_point });
  } catch (error: any) {
    console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
    console.error("Error al crear preferencia:", error);

    return res.status(500).json({
      error: "Error al procesar el pago",
      details: error.message,
    });
  }
};
