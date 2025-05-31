import { useCart } from "./CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useEffect, useState } from "react";
import CheckoutModal from "./CheckOutModal";
import { motion, AnimatePresence } from "framer-motion";

interface CartAsideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartAside({ isOpen, onClose }: CartAsideProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  // Variantes de animación
  const asideVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: {
      x: "100%",
      transition: { ease: "easeInOut", duration: 0.3 },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
    exit: { opacity: 0, x: -20 },
  };

  // Deshabilitar scroll del body cuando está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo oscurecido */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
          />

          {/* Panel lateral del carrito */}
          <motion.aside
            className="fixed inset-y-0 right-0 w-full max-w-md bg-pinkchew shadow-2xl z-50 flex flex-col"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={asideVariants}
          >
            {/* Encabezado */}
            <header className="p-6 border-b border-brownchew/20 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-brownchew">Tu Carrito</h2>
              <button
                onClick={onClose}
                className="text-brownchew hover:text-redchew text-3xl transition-colors"
                aria-label="Cerrar carrito"
              >
                &times;
              </button>
            </header>

            {/* Contenido */}
            <main className="flex-grow overflow-y-auto p-6">
              {cart.length === 0 ? (
                <motion.p
                  className="text-center text-brownchew/70 py-12 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Tu carrito está vacío
                </motion.p>
              ) : (
                <ul className="space-y-6">
                  {cart.map((item, index) => (
                    <motion.li
                      key={item.id_producto}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={itemVariants}
                      layout
                      className="flex gap-4 items-center border-b border-brownchew/10 pb-4"
                    >
                      <motion.img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-20 h-20 object-cover rounded-lg shadow"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-brownchew">
                          {item.nombre}
                        </h3>
                        <p className="text-redchew font-medium">
                          ${item.precio.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-brownchew/10 rounded-full px-3 py-1">
                        <button
                          onClick={() =>
                            item.quantity > 1 &&
                            updateQuantity(item.id_producto, item.quantity - 1)
                          }
                          className="p-1 text-brownchew hover:text-redchew transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <FaMinus size={14} />
                        </button>
                        <span className="w-6 text-center font-medium text-brownchew">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id_producto, item.quantity + 1)
                          }
                          className="p-1 text-brownchew hover:text-redchew transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <FaPlus size={14} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id_producto)}
                          className="p-1 text-redchew hover:text-brownchew ml-2 transition-colors"
                          aria-label="Eliminar producto"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </main>

            {/* Total + botón de checkout */}
            <motion.footer
              className="border-t border-brownchew/20 p-6 bg-white/10"
              layout
            >
              <div className="flex justify-between items-center mb-4 text-xl font-bold text-brownchew">
                <span>Total:</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <motion.button
                onClick={() => {
                  setShowCheckout(true);
                  onClose();
                }}
                disabled={cart.length === 0}
                className="w-full py-3 rounded-xl bg-redchew text-white font-semibold hover:bg-brownchew transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Ir al Checkout
              </motion.button>
            </motion.footer>
          </motion.aside>

          {/* Modal de Checkout */}
          {showCheckout && (
            <CheckoutModal
              isOpen={showCheckout}
              onClose={() => setShowCheckout(false)}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
