import { useState } from "react";

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
    <main className="min-h-screen flex justify-center items-center bg-beige">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-[#592d17] text-center">
          Recuperar Contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Correo electrónico:</label>
          <input
            type="email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#592d17] text-white py-2 rounded hover:bg-[#452212]"
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
