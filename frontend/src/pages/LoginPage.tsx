import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="bg-beige min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold text-center text-[#592d17] font-serif">
          Inicia sesión
        </h1>

        {/* Correo electrónico */}
        <div className="space-y-2">
          <label className="block text-black text-sm font-medium">
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-2 rounded-md bg-beige text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#592d17]"
          />
        </div>

        {/* Contraseña */}
        <div className="space-y-2">
          <label className="block text-black text-sm font-medium">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Tu contraseña"
              className="w-full px-4 py-2 pr-10 rounded-md bg-beige text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#592d17]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-[#592d17]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Enlace de recuperar contraseña */}
        <div className="text-center">
          <a href="#" className="text-sm text-[#592d17] hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Botones */}
        <div className="space-y-3">
          <button className="w-full py-2 px-4 bg-[#592d17] text-white rounded-md font-medium hover:bg-[#452212] transition">
            Iniciar sesión
          </button>

          <button className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition">
            <FcGoogle className="text-xl" />
            <span className="text-black font-medium">
              Iniciar sesión con Google
            </span>
          </button>
        </div>

        <div className="text-center">
          <a
            href="/register"
            className="text-sm text-[#592d17] hover:underline"
          >
            ¿No tienes cuenta? Regístrate aquí
          </a>
        </div>
      </motion.div>
    </main>
  );
}
