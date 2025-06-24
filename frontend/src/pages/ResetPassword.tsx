import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirm) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    const res = await fetch("http://localhost:3000/api/users/reestablecer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: newPassword }),
    });

    const data = await res.json();
    setMensaje(data.message);
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-beige">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-[#592d17] text-center">
          Reestablecer Contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Nueva contraseña:</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label className="block mb-2">Confirmar contraseña:</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-4"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#592d17] text-white py-2 rounded hover:bg-[#452212]"
          >
            Confirmar nueva contraseña
          </button>
        </form>
        {mensaje && (
          <p className="mt-4 text-center text-sm text-gray-700">{mensaje}</p>
        )}
      </div>
    </main>
  );
}
