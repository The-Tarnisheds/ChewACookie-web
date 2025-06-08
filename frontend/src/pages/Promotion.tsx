import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CartAside from "../components/CartAside";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Promotions() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPromo, setCurrentPromo] = useState(0);

  // EJEMPLO DE PROMOCIONES
  const promotions = [
    {
      title: "2x1 en Galletas Clásicas",
      description:
        "Lleva dos por el precio de una en nuestra selección de galletas tradicionales",
      discount: "50%",
      color: "bg-[#e8c39e]",
    },
    {
      title: "Combo Familiar",
      description:
        "Paquete especial con 24 galletas surtidas + 2 bebidas gratis",
      discount: "30%",
      color: "bg-[#d4a76a]",
    },
    {
      title: "Nuevos Sabores",
      description:
        "Prueba nuestros nuevos sabores con 20% de descuento en tu primera compra",
      discount: "20%",
      color: "bg-[#b88a4a]",
    },
  ];

  const nextPromo = () => {
    setCurrentPromo((prev) => (prev === promotions.length - 1 ? 0 : prev + 1));
  };

  const prevPromo = () => {
    setCurrentPromo((prev) => (prev === 0 ? promotions.length - 1 : prev - 1));
  };

  return (
    <main className="relative bg-beigechew min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-4 py-10">
        <motion.h1
          className="text-center text-5xl font-bold text-amber-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Promociones Especiales
        </motion.h1>
        <motion.p
          className="text-center text-lg text-gray-700 italic mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Aprovecha nuestras ofertas exclusivas y disfruta de los mejores
          sabores 🍪✨
        </motion.p>
      </header>

      {/* Carrusel de Promociones */}
      <section className="max-w-4xl mx-auto mb-16">
        <motion.div
          className="relative h-64 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromo}
              className={`${promotions[currentPromo].color} h-full flex flex-col justify-center items-center p-8 text-center`}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <motion.span
                className="text-6xl font-bold text-amber-900 mb-2"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {promotions[currentPromo].discount}
              </motion.span>
              <motion.h2
                className="text-3xl font-bold text-amber-900 mb-2"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {promotions[currentPromo].title}
              </motion.h2>
              <motion.p
                className="text-lg text-amber-900 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {promotions[currentPromo].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevPromo}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-amber-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100 transition-all"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={nextPromo}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-amber-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100 transition-all"
          >
            <FaChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPromo(index)}
                className={`w-3 h-3 rounded-full ${
                  currentPromo === index ? "bg-amber-800" : "bg-amber-300"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Productos en Oferta */}
      <section className="bg-[#f2e1c2] max-w-5xl mx-auto rounded-xl p-6 shadow-lg mb-16">
        <motion.h2
          className="text-3xl font-bold text-amber-800 mb-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Productos Destacados
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        ></motion.div>
      </section>

      {/* Ofertas Relámpago */}
      <section className="max-w-5xl mx-auto mb-16">
        <motion.h2
          className="text-3xl font-bold text-amber-800 mb-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Ofertas Relámpago
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-48 bg-amber-200 flex items-center justify-center">
                <span className="text-amber-800">
                  Imagen del Producto {item}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-amber-800 mb-1">
                  Producto {item}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-amber-600 font-bold">$1.500</span>
                  <span className="bg-amber-800 text-white text-sm px-2 py-1 rounded">
                    -30%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <Footer />

      <CartAside isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <WhatsAppButton />
    </main>
  );
}
