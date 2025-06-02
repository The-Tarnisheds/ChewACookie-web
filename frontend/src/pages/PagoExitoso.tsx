import { useSearchParams } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useEffect } from "react";

export default function PagoExitoso() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  // Obtener parámetros de MercadoPago
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");

  // Limpiar carrito al montar el componente
  useEffect(() => {
    clearCart();

    // Aquí podrías enviar una solicitud a tu backend para verificar el pago
    console.log("Pago exitoso. ID:", paymentId, "Status:", status);
  }, [clearCart]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">¡Pago Exitoso!</h1>
      <p className="mb-4">
        Gracias por tu compra. Tu pedido está siendo procesado.
      </p>

      {/* Mostrar detalles adicionales si están disponibles */}
      {paymentId && (
        <p className="text-sm text-gray-500 mb-4">
          ID de transacción: {paymentId}
        </p>
      )}

      <a
        href="/"
        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Volver al inicio
      </a>
    </div>
  );
}