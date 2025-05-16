import { useCart } from "./CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useEffect, useState } from "react";
import CheckoutModal from "./CheckOutModal";

interface CartAsideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartAside({ isOpen, onClose }: CartAsideProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );
  const [showCheckout, setShowCheckout] = useState(false);
  // Evita scroll del fondo cuando el carrito está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-pinkchew shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Tu Carrito</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Cerrar carrito"
            >
              &times;
            </button>
          </div>

          {/* Contenido del carrito */}
          <div className="flex-grow overflow-y-auto p-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Tu carrito está vacío
              </p>
            ) : (
              cart.map((item) => (
                <div key={item.id_producto} className="border-b py-4">
                  <div className="flex justify-between items-center">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
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
                        aria-label="Disminuir cantidad"
                      >
                        <FaMinus />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id_producto, item.quantity + 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-700"
                        aria-label="Aumentar cantidad"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id_producto)}
                        className="p-1 text-red-500 hover:text-red-700 ml-2"
                        aria-label="Eliminar producto"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Total */}
          <div className="border-t p-4">
            <div className="flex justify-between mb-4 font-bold text-lg">
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button
              onClick={() => {
                setShowCheckout(true);
                onClose();
              }}
              className="w-full bg-redchew text-white py-2 rounded-xl hover:bg-brownchew transition-colors"
            >
              ir al Checkout
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={onClose}
          aria-label="Cerrar carrito al hacer clic fuera"
        />
      )}
      {/* Modal de Checkout */}
      {showCheckout && (
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </>
  );
}
