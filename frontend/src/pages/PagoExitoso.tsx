import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function PagoExitoso() {
  const { cart } = useCart();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const navigate = useNavigate();
 
  
  // Guardar el detalle del pedido antes de limpiar el carrito
  const [detail] = useState(() => [...cart]);
  const total = detail.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  // Obtener parámetros de MercadoPago
  const paymentId = searchParams.get("payment_id");
  
  // Limpiar carrito al montar el componente
  useEffect(() => {
    console.log(detail)
    clearCart();

  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-whitechew rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold text-redchew mb-4">¡Pago Exitoso!</h1>
      {paymentId && (
        <p className="text-sm text-gray-500 mb-4">
          ID de transacción: {paymentId}
        </p>
      )}
      <p className="mb-4">
        Gracias por tu compra. Tu pedido está siendo procesado.
      </p>

      <h2 className="text-3xl font-bold text-redchew mb-4">Detalle de pedido</h2>
      <div className="max-w-full ">
        {detail.map((item) => (
          <motion.div
            key={item.id_producto}
            className="flex items-center justify-between border-b py-4 px-2 transition-all duration-200 hover:bg-gray-50 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <img
              src={item.imagen}
              alt={item.nombre}
              className="w-16 h-16 object-cover rounded-lg shadow"
            />
            <div className="flex-1 mx-4">
              <h3 className="font-medium text-lg text-gray-700">
                {item.nombre}
              </h3>
              <p className="text-sm text-gray-500">
                ${item.precio.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 text-center text-sm font-semibold">
                {item.quantity}
              </span>
            </div>
          </motion.div>
        ))}
        <div className="text-2xl font-bold text-end text-gray-800 mb-4">
          Total: ${total.toLocaleString()}
        </div>
      </div>

      <button
        style={{ fontFamily: "Poppins" }}
        onClick={() => navigate("/")}
        className="w-full bg-redchew text-white py-2 rounded-xl hover:bg-brownchew transition-colors"
      >
        Volver al inicio
      </button>
    </div>
  );
}