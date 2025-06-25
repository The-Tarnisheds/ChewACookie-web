import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/users/reestablecer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Contraseña actualizada correctamente. Redirigiendo...");
        setTimeout(() => (window.location.href = "/login"), 2000);
      } else {
        setMessage(data.message || "Error al actualizar la contraseña");
      }
    } catch (error) {
      setMessage("Error de conexión");
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">
            Enlace inválido
          </h2>
          <p>El enlace de recuperación no contiene un email válido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl min-h-screen flex items-center justify-center bg-amber-50 relative overflow-hidden">
      {/* Imagen animada flotante */}
      <motion.div
        className="absolute py-52 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          rotate: [0, 5, -5, 0], // Pequeña animación de balanceo
        }}
        transition={{
          y: { duration: 0.8, ease: "easeOut" },
          opacity: { duration: 0.8 },
          rotate: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 4,
            ease: "easeInOut",
          },
        }}
      >
        <img
          src="/assets/chewacookieHeader.png" // Asegúrate de tener esta imagen en tu carpeta public/assets
          alt=""
          className="w-80 h-80 object-contain drop-shadow-lg"
        />
      </motion.div>

      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative z-20 mt-16">
        {" "}
        <motion.h2
          style={{ fontFamily: "Poppins" }}
          className="text-2xl font-bold text-redchew mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Restablecer contraseña
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Nueva contraseña:
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Confirmar contraseña:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              required
            />
          </div>

          <motion.button
            style={{ fontFamily: "Poppins" }}
            type="submit"
            className="w-full bg-redchew text-white py-2 px-4 rounded-lg hover:bg-brownchew transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Actualizar contraseña
          </motion.button>
        </form>
        {message && (
          <motion.div
            className={`mt-4 p-3 rounded-lg ${
              message.includes("correctamente")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.div>
        )}
      </div>
    </div>
  );
}
