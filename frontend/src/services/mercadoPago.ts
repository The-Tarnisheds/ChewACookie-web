// services/mercadoPago.ts
export const createPreference = async (items: any[]) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/mercadopago/create_preference",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear la preferencia de pago");
    }
    const data = await response.json();
    return {
    init_point: data.init_point, // asegurate de que el backend devuelva esto
  };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
