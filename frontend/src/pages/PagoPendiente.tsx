import { useSearchParams } from "react-router-dom";

export default function PagoPendiente() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold text-yellow-600 mb-4">
        Pago Pendiente
      </h1>
      <p className="mb-4">
        Estamos procesando tu pago. Te notificaremos por correo cuando se
        complete.
      </p>

      {paymentId && (
        <p className="text-sm text-gray-500 mb-4">
          ID de transacción: {paymentId}
        </p>
      )}

      <p className="text-sm text-gray-500 mb-6">
        Por favor revisa tu bandeja de entrada o spam en los próximos minutos.
      </p>

      <a
        href="/"
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Volver al inicio
      </a>
    </div>
  );
}
