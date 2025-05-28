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

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
