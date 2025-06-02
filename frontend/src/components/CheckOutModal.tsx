import { useCart } from "./CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPreference } from "../services/mercadoPago";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (cart.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      const itemsForMP = cart.map((item) => ({
        nombre: item.nombre,
        precio: item.precio,
        quantity: item.quantity,
      }));


      // Creamos la preferencia usando el servicio
      const { init_point  } = await createPreference(itemsForMP);

      // Redirigimos al checkout de MercadoPago
      if (init_point) {
        window.location.href = init_point; // 🔥 Esto te lleva directo al checkout
      } else {
        throw new Error("No se recibió la URL de pago");
      }
    } catch (err) {
      
      console.error("Error al procesar el pago:", err);
      setError(
        "Ocurrió un error al procesar el pago. Por favor, intenta nuevamente."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modal = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdrop}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            variants={backdrop}
          />
          <motion.div
            className="relative bg-beige p-8 w-full max-w-3xl rounded-3xl shadow-2xl z-60"
            variants={modal}
          >
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
              🧾 Resumen de tu compra
            </h2>

            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-10 text-lg">
                Tu carrito está vacío.
              </p>
            ) : (
              <div className="max-h-96 overflow-y-auto pr-2">
                {cart.map((item) => (
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
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          updateQuantity(item.id_producto, item.quantity - 1)
                        }
                        className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
                      >
                        <FaMinus />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id_producto, item.quantity + 1)
                        }
                        className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id_producto)}
                        className="p-2 rounded-full hover:bg-red-100 text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-8 text-right">
              <div className="text-2xl font-bold text-gray-800 mb-4">
                Total: ${total.toLocaleString()}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-5 rounded-lg transition-all duration-200"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  className="bg-redchew hover:bg-brownchew text-white py-2 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handlePayment}
                  disabled={isProcessing || cart.length === 0}
                >
                  {isProcessing ? "Procesando..." : "Pagar ahora"}
                </button>
              </div>
              {error && (
                <div className="mt-3 text-sm text-red-600 text-right">
                  {error}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
