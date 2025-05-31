import { useSearchParams } from "react-router-dom";

export default function PagoFallido() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Pago Fallido</h1>
      <p className="mb-4">
        El pago no pudo ser procesado. Por favor intenta nuevamente.
      </p>

      {paymentId && (
        <p className="text-sm text-gray-500 mb-4">
          ID de transacción: {paymentId}
        </p>
      )}

      <div className="flex justify-center gap-4">
        <a
          href="/"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Volver al inicio
        </a>
        <a
          href="/catalogo"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Reintentar compra
        </a>
      </div>
    </div>
  );
}
