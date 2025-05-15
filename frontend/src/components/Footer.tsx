import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-beige py-8 px-4 mt-auto ">
      <div className="container mx-auto ">
        {/* Contenedor de las 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8  ">
          {/* Columna 1: Términos y condiciones */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4">Información Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terminos" className="hover:text-redchew font-bold">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="/privacidad" className="hover:text-redchew font-bold">
                  Políticas de privacidad
                </a>
              </li>
              <li>
                <a
                  href="/devoluciones"
                  className="hover:text-redchew font-bold"
                >
                  Devoluciones
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 2: */}
          <div className="text-center">
            <h3 className="font-bold text-lg mb-4">Mi Cuenta</h3>
            <ul className="space-y-2">
              <li>
                <a href="/pedir" className="hover:text-redchew font-bold">
                  Hacer pedido
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-redchew font-bold">
                  Iniciar sesión
                </a>
              </li>
              <li>
                <a href="/register" className="hover:text-redchew font-bold">
                  Registrarse
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes sociales */}
          <div className="text-center md:text-right">
            <h3 className="font-bold text-lg mb-4">Síguenos</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="https://instagram.com/chewacookie.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-redchew"
              >
                <FaInstagram />
              </a>
              <a
                href="https://tiktok.com/@chewacookie.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-redchew"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} Chew A Cookie. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
