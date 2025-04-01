import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="bg-white shadow-md">
        <img
          src="assets/Banner.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </header>
      <nav className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        {/* Logo centrado en móvil */}
        <Link to="/" className="text-2xl font-bold text-blue-600 mb-2 md:mb-0">
          ChewACookie
        </Link>

        {/* Menú de navegación */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            Inicio
          </Link>
          <Link
            to="/productos"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            Catálogo
          </Link>
          <Link
            to="/nosotros"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            ¿Quiénes somos?
          </Link>
          <Link
            to="/carrito"
            className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-1"
          >
            🛒 <span className="hidden md:inline">Carrito</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
