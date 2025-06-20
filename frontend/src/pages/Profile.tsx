import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import { useAuth } from "../components/AuthContext";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";

export default function Profile() {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

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
            {/* Cada fila de datos con animación individual */}
            <motion.div
              className="flex items-center group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ x: 5 }}
            >
              <motion.div
                className="bg-[#ffdede] p-3 rounded-full mr-4 group-hover:bg-[#af040d] transition-colors"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <FaUser className="text-[#af040d] text-xl group-hover:text-white transition-colors" />
              </motion.div>
              <div>
                <p
                  style={{ fontFamily: "Poppins" }}
                  className="text-sm text-gray-500"
                >
                  Nombre completo
                </p>
                <p
                  style={{ fontFamily: "Poppins" }}
                  className="text-lg font-medium text-[#592d17] group-hover:text-[#af040d] transition-colors"
                >
                  {userData.nombre} {userData.apellidos}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ x: 5 }}
            >
              <motion.div
                className="bg-[#ffdede] p-3 rounded-full mr-4 group-hover:bg-[#af040d] transition-colors"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <FaPhone className="text-[#af040d] text-xl group-hover:text-white transition-colors" />
              </motion.div>
              <div>
                <p
                  style={{ fontFamily: "Poppins" }}
                  className="text-sm text-gray-500"
                >
                  Teléfono
                </p>
                <p
                  style={{ fontFamily: "Poppins" }}
                  className="text-lg font-medium text-[#592d17] group-hover:text-[#af040d] transition-colors"
                >
                  {userData.telefono}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ x: 5 }}
            >
              <motion.div
                className="bg-[#ffdede] p-3 rounded-full mr-4 group-hover:bg-[#af040d] transition-colors"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <FaEnvelope className="text-[#af040d] text-xl group-hover:text-white transition-colors" />
              </motion.div>
              <div>
                <p
                  style={{ fontFamily: "Poppins" }}
                  className="text-sm text-gray-500"
                >
                  Correo electrónico
                </p>
                <p
                  style={{ fontFamily: "Poppins" }}
                  className="text-lg font-medium text-[#592d17] group-hover:text-[#af040d] transition-colors"
                >
                  {userData.email}
                </p>
              </div>
            </motion.div>

            {/* Botón de editar con animación */}
            <motion.button
              className="absolute bottom-6 right-6 bg-[#af040d] text-white px-4 py-2 rounded-full flex items-center"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#8a030a",
                transition: { type: "spring", stiffness: 400 },
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.span
                style={{ fontFamily: "Poppins" }}
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 10 }}
              >
                <FaEdit className="mr-2" />
              </motion.span>
              Editar
            </motion.button>
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
            <div className="flex justify-between items-center mb-4">
              <h3
                style={{ fontFamily: "Poppins" }}
                className="text-xl font-bold text-[#592d17]"
              >
                Dirección
              </h3>
              <div className="flex space-x-2">
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
            </div>

            {userData.direccion ? (
              <motion.div className="space-y-2 flex-grow" whileHover={{ x: 5 }}>
                <div className="flex items-start">
                  <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
                    <FaMapMarkerAlt className="text-[#af040d] mt-1 mr-2" />
                  </motion.div>
                  <div>
                    <p
                      style={{ fontFamily: "Poppins" }}
                      className="text-[#592d17] hover:text-[#af040d] transition-colors"
                    >
                      {userData.direccion.calle} #{userData.direccion.numero}
                    </p>
                    <p className="text-[#592d17] hover:text-[#af040d] transition-colors">
                      {userData.direccion.comuna}, {userData.direccion.region}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <p
                style={{ fontFamily: "Poppins" }}
                className="text-gray-500 italic flex-grow"
              >
                No hay dirección registrada
              </p>
            )}

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
          </motion.div>

          {/* Tarjeta de Chew Points con animaciones */}
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
                0
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

          {/* Tarjeta de acciones con animaciones */}
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
