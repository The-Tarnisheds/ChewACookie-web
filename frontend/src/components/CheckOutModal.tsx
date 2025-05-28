import { useCart } from "./CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPreference } from "../services/mercadoPago";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Declaración para TypeScript del objeto MercadoPago
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

  // Cargar SDK de MercadoPago
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
      // Preparamos los items para MercadoPago
      const itemsForMP = cart.map((item) => ({
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.quantity,
      }));

      // Creamos la preferencia usando el servicio
      const { id } = await createPreference(itemsForMP);

      // Redirigimos al checkout de MercadoPago
      if (window.MercadoPago) {
        const mp = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || "TEST-xxxx",
          {
            locale: "es-CL",
          }
        );

        mp.checkout({
          preference: {
            id: id,
          },
          autoOpen: true,
        });
      } else {
        throw new Error("El SDK de MercadoPago no se cargó correctamente");
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
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modal = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 30,
      transition: { duration: 0.2, ease: "easeIn" },
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
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          />

          <motion.div
            className="relative bg-beige p-6 w-full max-w-3xl rounded-2xl shadow-2xl z-60"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Resumen de tu compra
            </h2>

            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Tu carrito está vacío
              </p>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id_producto}
                    className="flex items-center justify-between border-b py-4"
                  >
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 mx-4">
                      <h3 className="font-medium">{item.nombre}</h3>
                      <p className="text-gray-600">
                        ${item.precio.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          updateQuantity(item.id_producto, item.quantity - 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <FaMinus />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id_producto, item.quantity + 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id_producto)}
                        className="p-1 text-red-500 hover:text-red-700 ml-2"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Total y botones */}
            <div className="mt-6 text-right">
              <div className="text-xl font-bold mb-4">
                Total: ${total.toLocaleString()}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  className="bg-redchew hover:bg-brownchew text-white py-2 px-6 rounded-lg disabled:opacity-50"
                  onClick={handlePayment}
                  disabled={isProcessing || cart.length === 0}
                >
                  {isProcessing ? "Procesando..." : "Pagar"}
                </button>
              </div>
              {error && (
                <div className="mt-2 text-red-500 text-sm text-right">
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
