import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MP_ACCESS_TOKEN) {
  throw new Error("Missing MP_ACCESS_TOKEN environment variable");
}

// Configuración para MercadoPago v2
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

// En v2.7.0 se usa Preference en lugar de Preferences
const preferenceClient = new Preference(client);

export { preferenceClient as preferences };
