import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import ListBoxLocation from "../components/ListBoxLocation";

interface Region {
  id_region: number
  nombre_region: string
}

interface Comuna {
  id_comuna: number
  nombre_comuna: string
  id_region: number
}

export default function RegisterForm() {
    const [region, setRegion] = useState<Region | null>(null)
    const [comuna, setComuna] = useState<Comuna | null>(null)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [formulario, setFormulario] = useState({
        nombres: '',
        apellidos:'',
        email: '',
        calle:'',
        numCalle:'',
        telefono:'',
        nombre_comuna: '',
        pass:password,
        pass2: confirmPassword
    })


    const passwordsMatch = password === confirmPassword;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormulario((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Región:', region);
    console.log('Comuna:', comuna);

    if (!passwordsMatch) return;

    const payload = {
        ...formulario,
        pass: password,
        pass2:confirmPassword,
        nombre_comuna: comuna?.nombre_comuna || "", // solo el nombre, como pide el backend
    };
    try {
        const res = await fetch("http://localhost:3000/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        });
        console.log(payload)


        const data = await res.json();
        console.log("Registro exitoso:", data);
    } catch (err) {
        console.error("Error al enviar el formulario:", err);
    }
    console.log("Registro exitoso");
    };


  return (
    <div>
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
            name="nombres"
            type="text"
            value={formulario.nombres}
            onChange={handleInputChange}
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
            name="apellidos"
            type="text"
            value={formulario.apellidos}
            onChange={handleInputChange}
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
            name="email"
            type="email"
            value={formulario.email}
            onChange={handleInputChange}
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-2 rounded-md bg-beige text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#592d17]"
            required
          />
        </div>
        {/* Telefono */}
        <div className="space-y-2">
          <label className="block text-black text-sm font-medium">
            Telefono
          </label>
          <input
            name="telefono"
            type="text"
            value={formulario.telefono}
            onChange={handleInputChange}
            placeholder="987654321"
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
            name="calle"
            type="text"
            value={formulario.calle}
            onChange={handleInputChange}
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
            name="numCalle"
            type="text"
            value={formulario.numCalle}
            onChange={handleInputChange}
            placeholder="Ej: 452"
            className="w-full px-4 py-2 rounded-md bg-beige text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#592d17]"
            required
            />
          </div>
        </div>

        <ListBoxLocation
            selectedRegion={region}
            setSelectedRegion={setRegion}
            selectedComuna={comuna}
            setSelectedComuna={setComuna}
        />

        {/* Contraseña */}
        <div className="space-y-2">
          <label className="block text-black text-sm font-medium">
            Contraseña
          </label>
          <div className="relative">
            <input
            name="pass"
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
            name="pass2"
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
            className="w-full mt-7 py-2 px-4 bg-[#592d17] text-white rounded-md font-medium hover:bg-[#452212] transition"
          >
            Registrarse
          </button>
        </div>
      </motion.form>
    </div>
  )
}
