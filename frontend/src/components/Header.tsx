import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

export default function Header() {
  return (
    <>
      <header className="bg-beige ">
        <nav className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
          {/* Logo centrado en móvil */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 mb-2 md:mb-0"
          >
            <img src="assets/Logo.png" alt="" className="w-80" />
          </Link>

          {/* Menú de navegación */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              to="/"
              className="bg-redchew border-1 p-2 rounded-3xl font-poppins text-whitechew text-center  hover:bg-brownchew  transition-colors w-30"
            >
              Inicio
            </Link>
            <Link
              to="/productos"
              className="bg-redchew border-1 p-2 rounded-3xl text-whitechew text-center hover:bg-brownchew  transition-colors w-30"
            >
              Catálogo
            </Link>
            <Link
              to="/nosotros"
              className="bg-redchew border-1 p-2 rounded-3xl  text-whitechew text-center hover:bg-brownchew  transition-colors w-30"
            >
              Promociones
            </Link>
            <Link
              to="/promociones"
              className="bg-redchew border-1 p-2 rounded-3xl  text-whitechew text-center hover:bg-brownchew  transition-colors w-30"
            >
              Nosotros
            </Link>
            <Link
              to="/carrito"
              className="border-redchew border p-2 rounded-3xl text-redchew hover:bg-brownchew transition-colors flex items-center gap-2"
            >
              <FaShoppingBag className=" w-6 h-6" />
            </Link>
            <Link
              to="/login"
              className=" border-1 p-2 rounded-3xl text-redchew  hover:bg-brownchew transition-colors flex items-center gap-1"
            >
              <FaUser className=" w-6 h-6" />
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
