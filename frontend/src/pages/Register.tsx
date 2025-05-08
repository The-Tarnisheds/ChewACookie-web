import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import ListBoxLocation from "../components/ListBoxLocation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const passwordsMatch = password === confirmPassword;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!passwordsMatch) return;

    console.log("Registro exitoso");
  };

  return (
    <main className="bg-beige min-h-screen flex items-center justify-center px-4">
      <motion.form
        onSubmit={handleRegister}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold text-center text-[#592d17] font-serif">
          Crea tu cuenta
        </h1>

        {/* Nombre y Apellido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-black text-sm font-medium">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full px-4 py-2 rounded-md bg-beige text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#592d17]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-black text-sm font-medium">
              Apellido
            </label>
            <input
              type="text"
              placeholder="Tu apellido"
              className="w-full px-4 py-2 rounded-md bg-beige text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#592d17]"
              required
            />
          </div>
        </div>

        {/* Correo electrónico */}
        <div className="space-y-2">
          <label className="block text-black text-sm font-medium">
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-2 rounded-md bg-beige text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#592d17]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-black text-sm font-medium">
              Direccion
            </label>
            <input
              type="text"
              placeholder="Nombre Calle"
              className="w-full px-4 py-2 rounded-md bg-beige text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#592d17]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-black text-sm font-medium">
              Numero
            </label>
            <input
              type="text"
              placeholder="Ej: 452"
              className="w-full px-4 py-2 rounded-md bg-beige text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#592d17]"
              required
            />
          </div>
        </div>

        <ListBoxLocation/>

        {/* Contraseña */}
        <div className="space-y-2">
          <label className="block text-black text-sm font-medium">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-2 pr-10 rounded-md bg-beige text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#592d17]"
              required
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

        {/* Confirmar Contraseña */}
        <div className="space-y-2">
          <label className="block text-black text-sm font-medium">
            Confirmar contraseña
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              className="w-full px-4 py-2 pr-10 rounded-md bg-beige text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#592d17]"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-[#592d17]"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {submitted && !passwordsMatch && (
            <p className="text-red-600 text-sm font-medium">
              Las contraseñas no coinciden.
            </p>
          )}
        </div>

        {/* Botón de Registro */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#592d17] text-white rounded-md font-medium hover:bg-[#452212] transition"
          >
            Registrarse
          </button>
        </div>
      </motion.form>
    </main>
  );
}
