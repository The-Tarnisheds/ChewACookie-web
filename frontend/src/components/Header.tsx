import { Link } from "react-router-dom";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useState } from "react";
import CartAside from "./CartAside";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { cartItemsCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="bg-beige shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" aria-label="Inicio">
              <img
                src="assets/Logo.png"
                alt="Logo"
                className="w-60 md:w-72 object-contain"
              />
            </Link>
          </motion.div>

          {/* Menú de navegación */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-3 md:gap-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {[
              { to: "/", label: "Inicio" },
              { to: "/catalogo", label: "Catálogo" },
              { to: "/promociones", label: "Promociones" },
              { to: "/aboutus", label: "Nosotros" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="bg-redchew text-whitechew font-medium rounded-3xl px-4 py-2 hover:bg-brownchew transition-colors shadow-sm"
              >
                {label}
              </Link>
            ))}

            {/* Carrito */}
            <motion.button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 px-4 rounded-3xl border border-redchew text-redchew hover:bg-brownchew transition-colors flex items-center gap-2"
              whileTap={{ scale: 0.95 }}
              aria-label="Abrir carrito"
            >
              <FaShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 10 }}
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </motion.button>

            {/* Login */}
            <Link
              to="/login"
              className="p-2 px-4 rounded-3xl border border-redchew text-redchew hover:bg-brownchew transition-colors flex items-center gap-2"
              aria-label="Iniciar sesión"
            >
              <FaUser className="w-5 h-5" />
            </Link>
          </motion.div>
        </nav>
      </header>

      {/* Aside del carrito */}
      <AnimatePresence>
        {isCartOpen && (
          <CartAside isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
