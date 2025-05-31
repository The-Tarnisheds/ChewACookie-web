import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-beige text-redchew mt-auto shadow-inner">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Columna 1: Información Legal */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl mb-4 uppercase tracking-wide">
              Información Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/terminos"
                  className="transition-colors hover:text-brownchew font-semibold"
                >
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a
                  href="/privacidad"
                  className="transition-colors hover:text-brownchew font-semibold"
                >
                  Políticas de privacidad
                </a>
              </li>
              <li>
                <a
                  href="/devoluciones"
                  className="transition-colors hover:text-brownchew font-semibold"
                >
                  Devoluciones
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 2: Mi cuenta */}
          <div className="text-center">
            <h3 className="font-bold text-xl mb-4 uppercase tracking-wide">
              Mi Cuenta
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/pedir"
                  className="transition-colors hover:text-brownchew font-semibold"
                >
                  Hacer pedido
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="transition-colors hover:text-brownchew font-semibold"
                >
                  Iniciar sesión
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="transition-colors hover:text-brownchew font-semibold"
                >
                  Registrarse
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes sociales */}
          <div className="text-center md:text-right">
            <h3 className="font-bold text-xl mb-4 uppercase tracking-wide">
              Síguenos
            </h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="https://instagram.com/chewacookie.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl transition transform hover:text-brownchew hover:scale-110"
              >
                <FaInstagram />
              </a>
              <a
                href="https://tiktok.com/@chewacookie.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl transition transform hover:text-brownchew hover:scale-110"
              >
                <FaTiktok />
              </a>
              <a
                href="https://facebook.com/profile.php?id=61576236873094"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl transition transform hover:text-brownchew hover:scale-110"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria + copyright */}
        <div className="mt-10 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-redchew">Chew A Cookie</span>. Todos
            los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
