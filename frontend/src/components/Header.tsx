import { Link } from "react-router-dom";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useState } from "react";
import CartAside from "./CartAside";

export default function Header() {
  const { cartItemsCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="bg-beige">
        <nav className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 mb-2 md:mb-0"
          >
            <img src="assets/Logo.png" alt="Logo" className="w-80" />
          </Link>

          {/* Menú de navegación */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              to="/"
              className="bg-redchew border-1 p-2 rounded-3xl font-poppins text-whitechew text-center hover:bg-brownchew transition-colors w-30"
            >
              Inicio
            </Link>
            <Link
              to="/productos"
              className="bg-redchew border-1 p-2 rounded-3xl text-whitechew text-center hover:bg-brownchew transition-colors w-30"
            >
              Catálogo
            </Link>
            <Link
              to="/nosotros"
              className="bg-redchew border-1 p-2 rounded-3xl text-whitechew text-center hover:bg-brownchew transition-colors w-30"
            >
              Promociones
            </Link>
            <Link
              to="/promociones"
              className="bg-redchew border-1 p-2 rounded-3xl text-whitechew text-center hover:bg-brownchew transition-colors w-30"
            >
              Nosotros
            </Link>

            {/* Botón del carrito */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative border-redchew border p-2 rounded-3xl text-redchew hover:bg-brownchew transition-colors flex items-center gap-2"
              aria-label="Carrito de compras"
            >
              <FaShoppingBag className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <Link
              to="/login"
              className="border-1 p-2 rounded-3xl text-redchew hover:bg-brownchew transition-colors flex items-center gap-1"
              aria-label="Iniciar sesión"
            >
              <FaUser className="w-6 h-6" />
            </Link>
          </div>
        </nav>
      </header>

      {/* CartAside fuera del header para mejor posicionamiento */}
      <CartAside isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
