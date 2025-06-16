import { Link, useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import { useCart } from "./CartContext";
import { useEffect, useRef, useState } from "react";
import CartAside from "./CartAside";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthContext";

export default function Header() {
  const { cartItemsCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Cierra el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    let isAdmin = false;
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.isAdmin) {
        isAdmin=true
      }
    }
  });
  
  const firstName = user?.nombre?.split(" ")[0] || "Usuario";
  const handleNavigation = (path: string) => {
    setIsUserDropdownOpen(false);
    navigate(path);
  };
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
              style={{ fontFamily: 'Poppins' }}
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

            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="p-2 px-4 rounded-3xl border border-redchew text-redchew hover:bg-brownchew transition-colors flex items-center gap-2"
                aria-label="Menú de usuario"
                whileTap={{ scale: 0.95 }}
              >
                <FaUser className="w-5 h-5" />
                {isUserDropdownOpen ? (
                  <FaChevronUp className="w-4 h-4" />
                ) : (
                  <FaChevronDown className="w-4 h-4" />
                )}
                {isAuthenticated && (
                  <span className="hidden md:inline ml-1">{firstName}</span>
                )}
              </motion.button>
              {/* Logica para el perfil en caso de estar logueado */}
              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-brownchew"
                  >
                    <div className="py-1">
                      {isAuthenticated ? (
                        <>
                          <button
                            onClick={() => handleNavigation("/perfil")}
                            className="w-full text-left px-4 py-2 text-brownchew hover:bg-beige transition-colors"
                          >
                            Mi perfil
                          </button>
                          {user?.isAdmin && (
                            <button
                              onClick={() => handleNavigation("/admin-dashboard")}
                              className="w-full text-left px-4 py-2 text-brownchew hover:bg-beige transition-colors"
                            >
                              Panel de administración
                            </button>
                          )}
                          <button
                            onClick={() => {
                              logout();
                              setIsUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-brownchew hover:bg-beige transition-colors"
                          >
                            Cerrar sesión
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleNavigation("/login")}
                            className="w-full text-left px-4 py-2 text-brownchew hover:bg-beige transition-colors"
                          >
                            Iniciar sesión
                          </button>
                          <button
                            onClick={() => handleNavigation("/register")}
                            className="w-full text-left px-4 py-2 text-brownchew hover:bg-beige transition-colors"
                          >
                            Registrarse
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
