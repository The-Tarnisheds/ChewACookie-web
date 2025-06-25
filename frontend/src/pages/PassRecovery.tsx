import { useState } from "react";
import { motion } from "framer-motion";

export default function PassRecovery() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/users/recuperar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      setMensaje(
        data.success ? "Revisa tu correo para continuar" : data.message
      );
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <main className="rounded-2xl min-h-screen flex items-center justify-center bg-amber-50 relative overflow-hidden">
      {/* Imagen animada flotante */}
      <motion.div
        className="absolute py-42 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          rotate: [0, 5, -5, 0],
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
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2
          style={{ fontFamily: "Poppins" }}
          className="text-2xl font-bold mb-4 text-redchew text-center"
        >
          Recuperar Contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          <label style={{ fontFamily: "Poppins" }} className="block mb-2">
            Correo electrónico:
          </label>
          <input
            type="email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            placeholder="tucorreo@ejemplo.cl"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            style={{ fontFamily: "Poppins" }}
            type="submit"
            className="w-full bg-redchew text-white py-2 rounded hover:bg-brownchew"
          >
            Enviar enlace de recuperación
          </button>
        </form>
        {mensaje && (
          <p className="mt-4 text-center text-sm text-gray-700">{mensaje}</p>
        )}
      </div>
    </main>
  );
}
