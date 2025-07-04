import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import { useAuth } from "../components/AuthContext";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";
import { EditableField } from "../components/EditableField";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { EditableAddress } from "../components/EditableAddress";

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [chewPoints, setChewPoints] = useState<number>(0);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);
  console.log("User data:", userData);

  useEffect(() => {
    const fetchChewPoints = async () => {
      try {
        const user = localStorage.getItem("user");
        const parsedUser = user ? JSON.parse(user) : null;
        axios
          .get(
            `http://localhost:3000/api/users/chew-points/${parsedUser?.email}`
          )
          .then((response) => {
            const chewPoints = response.data.data;
            console.log("ChewPoints obtenidos:", chewPoints);
            setChewPoints(chewPoints);
          })
          .catch((error) => {
            console.error("Error fetching ChewPoints:", error);
          });
      } catch (error) {
        console.error("Error al obtener ChewPoints:", error);
      }
    };
    fetchChewPoints();
  }, []);

  const handleUpdateUser = async (
    field: string,
    value: string
  ): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      console.log("Contenido de localStorage:", {
        token: localStorage.getItem("token"),
        user: localStorage.getItem("user"),
      });

      if (!token) {
        throw new Error(
          "No se encontró el token de autenticación. Por favor, vuelve a iniciar sesión."
        );
      }

      const updateData = {
        nombre:
          field === "nombreCompleto" ? value.split(" ")[0] : userData.nombre,
        apellidos:
          field === "nombreCompleto"
            ? value.split(" ").slice(1).join(" ")
            : userData.apellidos,
        telefono: field === "telefono" ? value : userData.telefono,
        newEmail: field === "email" ? value : userData.email,
      };

      const response = await axios.put(
        "http://localhost:3000/api/users/edit-user",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.usuario) {
        updateUser(response.data.usuario);
        setUserData(response.data.usuario);
        alert("¡Datos actualizados correctamente!");
      }
    } catch (error: unknown) {
      let errorMessage = "Error al actualizar los datos";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Error completo:", {
        message: errorMessage,
        token: localStorage.getItem("token"),
        time: new Date().toISOString(),
      });

      alert(errorMessage);
      throw error;
    }
  };

  const handleUpdateAddress = async (address: any) => {
    try {
      const response = await axios.put("/api/users/address", address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.usuario) {
        updateUser(response.data.usuario);
        setUserData(response.data.usuario);
      }
    } catch (error) {
      console.error("Error al actualizar dirección:", error);
      throw error;
    }
  };

  if (!userData) {
    return (
      <main className="relative bg-[#faf7ee] min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p
            style={{ fontFamily: "Poppins" }}
            className="text-[#592d17] text-xl"
          >
            Cargando perfil...
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative bg-[#faf7ee] min-h-screen">
      {/* Header con animación de entrada */}
      <motion.header
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1
          style={{ fontFamily: "Poppins" }}
          className="text-center text-4xl font-bold text-[#592d17] mb-4"
        >
          Mi Perfil
        </h1>
      </motion.header>

      {/* Contenido principal */}
      <section className="container mx-auto px-4 pb-16 max-w-6xl">
        {/* Sección de datos personales - Tarjeta con efectos hover */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          whileHover={{
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{ fontFamily: "Poppins" }}
            className="text-2xl font-bold text-[#592d17] mb-6 pb-2 border-b border-[#f4e9d7]"
          >
            Mis Datos
          </h2>

          <div className="space-y-4">
            {/* Campo de nombre completo */}
            <EditableField
              label="Nombre completo"
              value={`${userData.nombre} ${userData.apellidos}`}
              icon={
                <FaUser className="text-[#af040d] text-xl group-hover:text-white transition-colors" />
              }
              onSave={async (newValue) => {
                const [nombre, ...apellidos] = newValue.split(" ");
                await handleUpdateUser("nombre", nombre);
                await handleUpdateUser("apellidos", apellidos.join(" "));
              }}
              validation={(value) => {
                if (value.trim().split(" ").length < 2)
                  return "Debe incluir nombre y apellido";
                return null;
              }}
            />

            {/* Campo de teléfono */}
            <EditableField
              label="Teléfono"
              value={userData.telefono}
              icon={
                <FaPhone className="text-[#af040d] text-xl group-hover:text-white transition-colors" />
              }
              onSave={(newValue) => handleUpdateUser("telefono", newValue)}
              validation={(value) => {
                if (!/^[0-9]{9,12}$/.test(value)) return "Teléfono no válido";
                return null;
              }}
            />

            {/* Campo de email */}
            <EditableField
              label="Correo electrónico"
              value={userData.email}
              icon={
                <FaEnvelope className="text-[#af040d] text-xl group-hover:text-white transition-colors" />
              }
              onSave={(newValue) => handleUpdateUser("email", newValue)}
              validation={(value) => {
                if (!/^\S+@\S+\.\S+$/.test(value)) return "Email no válido";
                return null;
              }}
              inputType="email"
            />
          </div>
        </motion.div>

        {/* Grid de tarjetas inferiores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta de dirección con animaciones */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 mb-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{ fontFamily: "Poppins" }}
                className="text-2xl font-bold text-[#592d17] mb-6 pb-2 border-b border-[#f4e9d7]"
              >
                Dirección
              </h2>

              {userData.direccion ? (
                <motion.div
                  className="bg-[#fdfcfb] rounded-lg shadow-md px-6 py-4 border border-gray-200 flex justify-between items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-gray-800 font-medium text-base leading-relaxed">
                    {userData.direccion.calle} #{userData.direccion.numero}
                    <br />
                    {userData.direccion.comuna}, {userData.direccion.region}
                  </div>

                  <div className="flex space-x-2 ml-4 mt-1">
                    <motion.button
                      className="text-[#af040d] p-2 rounded-full hover:bg-[#ffdede]"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      className="text-[#af040d] p-2 rounded-full hover:bg-[#ffdede]"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <p className="text-gray-500 italic">
                  No se ha agregado una dirección aún.
                </p>
              )}
            </motion.div>

            {!userData.direccion && (
              <motion.button
                className="mt-6 w-full bg-[#f4e9d7] text-[#592d17] py-2 rounded-full flex items-center justify-center hover:bg-[#e2c89f] transition"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "#e2c89f",
                  transition: { type: "spring" },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  style={{ fontFamily: "Poppins" }}
                  animate={{ rotate: 0 }}
                  whileHover={{ rotate: 90 }}
                >
                  <FaPlus className="mr-2" />
                </motion.span>
                Agregar
              </motion.button>
            )}
          </motion.div>

          {/* Resto de las tarjetas (ChewPoints y Acciones) se mantienen igual */}
          <motion.div
            style={{ fontFamily: "Poppins" }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{ fontFamily: "Poppins" }}
              className="text-xl font-bold text-[#592d17] mb-4"
            >
              Mis ChewPoints
            </h3>
            <div className="text-center py-4 flex-grow flex flex-col justify-center">
              <motion.div
                className="text-5xl font-bold text-[#af040d] mb-2"
                whileHover={{ scale: 1.1 }}
              >
                {chewPoints}
              </motion.div>
              <p style={{ fontFamily: "Poppins" }} className="text-[#592d17]">
                Puntos acumulados
              </p>
            </div>
            <motion.p
              style={{ fontFamily: "Poppins" }}
              className="text-sm text-gray-500 text-center mt-4"
              whileHover={{ color: "#592d17" }}
            >
              Gana puntos con tus compras y canjéalos por productos
            </motion.p>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 className="text-xl font-bold text-[#592d17] mb-4">Acciones</h3>
            <div className="flex-grow"></div>
            <motion.button
              onClick={logout}
              className="w-full bg-[#af040d] text-white py-2 rounded-full hover:bg-[#8a030a] transition"
              whileHover={{
                scale: 1.02,
                backgroundColor: "#8a030a",
                transition: { type: "spring" },
              }}
              whileTap={{ scale: 0.98 }}
            >
              Cerrar sesión
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
